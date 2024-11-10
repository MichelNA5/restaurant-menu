// services/userService.js
const { initDB } = require('../config/database');
const User = require('../models/userModel');
const crypto = require('crypto');

// Helper function to hash a password using SHA-256
const hashPassword = (password) => {
    const hash = crypto.createHash('sha256'); // Create SHA-256 hash instance
    hash.update(password);                    // Hash the password
    return hash.digest('hex');                // Return the hashed password as a hex string
};

class UserService {
    constructor() {
        this.pool = null;
        this.init();
    }

    // Initialize database connection pool
    async init() {
        this.pool = await initDB();
    }

    // Retrieve stored password hash for a given username
    async getPasswordHash(username) {
        const query = "SELECT password_hash FROM user WHERE username = ?";
        try {
            const [rows] = await this.pool.execute(query, [username]);
            if (rows.length > 0) {
                return rows[0].password_hash; // Return the stored password hash if found
            }
        } catch (error) {
            console.error("Error retrieving password hash:", error);
        }
        return null; // Return null if user is not found or error occurs
    }

    // Authenticate a user by comparing input password with stored hash
    async authenticate(username, inputPassword) {
        const storedHash = await this.getPasswordHash(username);
        if (!storedHash) {
            return false; // Return false if user not found or error occurred
        }

        // Hash the input password and compare with stored hash
        const hashedInput = hashPassword(inputPassword);
        return hashedInput === storedHash;
    }

    // Retrieve and return all users from the database
    async getAllUsers() {
        const [rows] = await this.pool.query('SELECT * FROM user');
        return rows.map(User.fromRow); // Map rows to User model instances
    }

    // Retrieve a user by their ID
    async getUserById(id) {
        const [rows] = await this.pool.query('SELECT * FROM user WHERE user_id = ?', [id]);
        if (rows.length === 0) return null; // Return null if user not found
        return User.fromRow(rows[0]);       // Return User instance
    }

    // Create a new user in the database
    async createUser(userData) {
        const { username, email, password, address } = userData;

        // Hash the plaintext password
        const hashedPassword = hashPassword(password);

        // Insert the user into the database
        const [result] = await this.pool.query(
            'INSERT INTO user (username, email, password_hash, created_at, address) VALUES (?, ?, ?, NOW(), ?)',
            [username, email, hashedPassword, address]
        );

        // Create and return a User instance with the new user's properties
        const insertedUser = new User(result.insertId, username, email, hashedPassword, address);
        return insertedUser;
    }

    // Update an existing user's details
    async updateUser(id, userData) {
        const { username, email, address } = userData;
        const [result] = await this.pool.query(
            'UPDATE user SET username = ?, email = ?, address= ?  WHERE user_id = ?',
            [username, email, address, id]
        );
        return result.affectedRows > 0; // Return true if rows were affected, indicating success
    }

    // Delete a user by their ID
    //THIS METHOD WILL only work when user data is cleared from the database
    async deleteUser(id) {
        const [result] = await this.pool.query('DELETE FROM user WHERE user_id = ?', [id]);
        return result.affectedRows > 0; // Return true if rows were affected, indicating success
    }

    // Retrieve a user's ID based on their username
    async getUserIdByUsername(username) {
        const [rows] = await this.pool.query('SELECT user_id FROM user WHERE username = ?', [username]);
        if (rows.length === 0) return null; // Return null if user not found
        return rows[0].user_id;             // Return the user ID
    }
}

module.exports = new UserService();
