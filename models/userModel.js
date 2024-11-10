const moment = require("moment");

class User {
    //User constructor
    constructor(id, username, email, passwordhash, address) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        this.passwordhash = passwordhash;
        this.address = address;
    }

    // Static method to map database row to User model
    static fromRow(row) {
        return new User(
            row.user_id,
            row.username,
            row.email,
            row.password_hash,
            row.address,
            moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")
        );
    }
}

module.exports = User;
