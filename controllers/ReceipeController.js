const ReceipeService = require("../database/services/receipe");

const ReceipeController = {
    add: async (req, res) => {
        try {
            const { name, type } = req.body;
            const saveStatus = await ReceipeService.create({ name, type });
            req.body.id = saveStatus._id;
            res.status(201).send(req.body);
        }
        catch(error){
            res.status(500).send(error.message);
        }
    },

    fetchAll: async (req, res) => {
        const allReceipe = await ReceipeService.findAll();
        res.status(200).send(allReceipe);
    },

    findByReceipeId: async (req, res) => {
        const id = req.params.id;
        const receipe = await ReceipeService.findById(id);
        res.status(200).send(receipe);
    }
}

module.exports = ReceipeController;