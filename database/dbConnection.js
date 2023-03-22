const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/receipe";

mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
})

module.exports = mongoose;