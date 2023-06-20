const express = require("express");
const { UserModel } = require("../models/User.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);

    try {
        const user = await UserModel.findOne({email});
        // console.log(user);

        if (user) {
            res.status(200).send({"msg": "Email already present"});
        }
        else {
            bcrypt.hash(password, 5, async (err, hashPassword) =>  {
                const user = new UserModel({email, password: hashPassword});
                await user.save();
                // console.log(user);
        
                res.status(200).send({"msg": "User created successfully"});
            });
        }
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
})


userRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);

    try {
        const user = await UserModel.findOne({email});
        // console.log(user);
        
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ email }, 'someRandomSecretKey');
                    // console.log(token);

                    res.status(200).send({"msg": "User logged-in successfully", "email": email, "token": token});
                }
                else {
                    res.status(200).send({"msg": "Invalid email/password"});
                }
            });
        }
        else {
            res.status(200).send({"msg": "Invalid email/password"});
        }
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
})


module.exports = {
    userRouter
}
