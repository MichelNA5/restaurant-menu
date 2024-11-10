const moment = require('moment');

class FavoriteCombination {
    constructor(combination_id, user_id, name) {
        this.combination_id = combination_id;
        this.user_id = user_id;
        this.name = name;
    }

    static fromRow(row) {
        return new FavoriteCombination(row.combination_id, row.user_id, row.name);
    }
}

module.exports = FavoriteCombination;
