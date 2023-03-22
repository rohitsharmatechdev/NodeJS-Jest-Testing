const app = require('./index');
require("dotenv").config();
const config = {
    port: process.env.port
}

app.listen(config.port, () => {
    console.log(`Node jest server is running on ${config.port}`);
})

module.exports = app;

