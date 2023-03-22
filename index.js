const express = require("express");
const app = express();

const initializeApp = () => {
    app.use("/", require("./routes/index.js"))
    return app;
}

module.exports = initializeApp();