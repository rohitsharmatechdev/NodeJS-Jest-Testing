const ReceipeModel = require("../models/receipe");

const ReceipeService = {
    create: (payload) => {
        return ReceipeModel.create(payload);
    },
    findAll: () => ReceipeModel.find(),
    findById: id => ReceipeModel.findById(id)
}

module.exports = ReceipeService;