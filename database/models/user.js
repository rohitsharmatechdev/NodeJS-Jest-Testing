const mongoose = require("../dbConnection");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// club model
mongoose.model("users", UserSchema);

module.exports = mongoose.model("users");