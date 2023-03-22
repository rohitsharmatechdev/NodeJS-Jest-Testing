const UserService = require("../database/services/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const generateToken = user => jwt.sign(user.toJSON(), "secret", {expiresIn: '1w'});
    
const UserController = {
    health: (req, res) => {
        res.status(200).send({status: "working"});
    },

    login:async (req, res, next) => {
        try {
            if(!req.body.username || !req.body.password){
                return res.status(400).send({
                    status: false,
                    message: "username or password can not be empty"
                })
            }
    
            const findUser = await UserService.findByUsername(req.body.username);
            if(!findUser){
                return res.status(400).send({
                    status: false,
                    message: "Invalid username or password"
                })
            }
    
            const confirmPassword = await bcrypt.compare(req.body.password, findUser.password);
            if(!confirmPassword){
                return res.status(400).send({
                    status: false,
                    message: "Invalid username or password"
                })
            }

            const userDetails = {
                id: findUser._id,
                username: findUser.username
            };

            return res.status(200).send({
                status: true,
                data: userDetails,
                token: generateToken(findUser) 
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "login failed. "
            })
        }
    }
}

module.exports = UserController;