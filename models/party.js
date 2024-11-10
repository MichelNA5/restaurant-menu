class Party {
    constructor(party_id, party_code, creator_user_id, is_active) {
        this.partyId = party_id;
        this.partyCode = party_code;
        this.creatorUserId = creator_user_id;
        this.isActive = is_active;
    }

    static fromRow(row) {
        return new Party(row.party_id, row.party_code, row.creator_user_id, row.is_active);
    }
}

module.exports = Party;
