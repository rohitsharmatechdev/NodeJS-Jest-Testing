const mongoose = require("../dbConnection");
const {Schema} = mongoose;

// create a schema
const ReceipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

mongoose.model("receipe", ReceipeSchema);
module.exports = mongoose.model("receipe");