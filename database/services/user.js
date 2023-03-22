const UserModel = require("../models/user");

const UserService = {
    findByUsername: async (username) => {
        const user = await UserModel.findOne({username});
        return user ?? false;
    }
}

module.exports = UserService;