const router = require('express').Router();
const {UniqueConstraintError} = require('sequelize/lib/errors');
const {UserModel} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.post("/register", async (req,res) => {
    let {email, password} = req.body.user;
    try {
    const User = await UserModel.create({
        email,
        password: bcrypt.hashSync(password, 13),
    })


    //          .sign creates token       This is the passphrase.        
    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    }); 

    res.status(201).json({
        message: "User sccessfully registered",
        user: User,
        sessionToken: token
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
        res.status(500).json({
            message: "Failed to register user",
        });
      }
    }
});

router.post ("/login", async (req, res) => {
    let {email, password} = req.body.user;
     
    try{
    const loginUser = await UserModel.findOne ({
        where: {
            email: email,
        },
    })
    if (loginUser) {

        let passwordComparison = await bcrypt.compare(password, loginUser.password);
        
        if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

    res.status(200).json({
        message: "User successfully logged in!",
        user: loginUser,
        sessionToken: token
    });
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }

    } catch (err) {
    res.status(500).json ({
        message: "No login for you!",
    })
    }
});
module.exports = router;