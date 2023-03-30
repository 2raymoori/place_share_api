const express = require('express');
const Router = express.Router();
const {users,login,signup} = require('../Controllers/user.controller')

Router.get('/',users);
Router.post('/login',login);
Router.put('/signup',signup);

module.exports = Router;