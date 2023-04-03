const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_Secret = 'Jarajarabachke';

const router = express.Router();


// ROUTE 1 : Create a User using post '/api/auth/createuser. Login not required"
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        //checking if user already exist or not.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" })
        }

        //creating new user
        const salt = await bcrypt.genSalt(10);
        const setpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: setpass,
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = JWT.sign(data, JWT_Secret);
        res.json({authToken});
    }

    //catching error if any occur
    catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})


//ROUTE 2 : Authentiction user using: POST "/api/auth/login. Login not Required"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = JWT.sign(data, JWT_Secret);
        res.json({authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})

//ROUTE 3 : Get Loggedin user details using POST "/api/auth/getuser". Login required.
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})

module.exports = router;