// controllers/userController.js
const userService = require('../services/userService');

class UserController {

    // Authenticate a user by checking their username and password
    async authenticateUser(req, res) {
        const { username, password } = req.body;

        try {
            // Check if the credentials are correct
            const isAuthenticated = await userService.authenticate(username, password);
            if (isAuthenticated) {
                // Send success response if authentication is successful
                res.status(200).json({ message: "Authentication successful" });
            } else {
                // Send unauthorized response if authentication fails
                res.status(401).json({ message: "Invalid username or password" });
            }
        } catch (error) {
            // Handle server errors during authentication
            res.status(500).json({ message: "An error occurred during authentication" });
        }
    }

    // Retrieve and send a list of all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);  // Send the users in response
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieve and send a user by their ID
    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.getUserById(id);
            if (!user) {
                // Send 404 response if user is not found
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);  // Send the user data in response
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Create a new user with provided details
    async createUser(req, res) {
        try {
            const { username, email, password, address } = req.body;
            const newUser = await userService.createUser({ username, email, password, address });
            // Send the newly created user data with a 201 Created status
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Update an existing user's details
    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { username, email, address } = req.body;
            const success = await userService.updateUser(id, { username, email, address });
            if (!success) {
                // Send 404 response if user is not found or no updates were made
                return res.status(404).json({ message: 'User not found or no changes made' });
            }
            res.json({ message: 'User updated successfully' });  // Send success message
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete a user by their ID
    //THIS METHOD WILL only work when user data is cleared from the database
    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await userService.deleteUser(id);
            if (!success) {
                // Send 404 response if user is not found
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });  // Send success message
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Fetch the user ID based on the username
    async fetchUserIdByUsername(req, res) {
        try {
            const { username } = req.params;
            // Call the service function to get the user ID
            const userId = await userService.getUserIdByUsername(username);
            res.status(200).json({ userId });  // Send the user ID in response
        } catch (error) {
            res.status(400).json({ error: error.message });  // Handle errors and send a 400 response
        }
    }
}

module.exports = new UserController();
