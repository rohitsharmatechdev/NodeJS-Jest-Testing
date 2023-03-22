const express = require("express");
const Router = express.Router();

const UserController = require("../controllers/UserController");
const ReceipeController = require("../controllers/ReceipeController");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authenticate = require("../middleware/authentication");

Router.get("/health", UserController.health)

Router.post("/login", jsonParser, UserController.login);

Router.post("/receipe", authenticate , jsonParser, ReceipeController.add);
Router.get("/receipe", ReceipeController.fetchAll);
Router.get("/receipe/:id", ReceipeController.findByReceipeId);

module.exports = Router;