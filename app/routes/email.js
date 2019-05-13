const express = require("express");
const routes = express.Router();

const emailController = require('../controllers/email/email');

routes.post("/email", emailController.sendEmail);

module.exports = routes;

