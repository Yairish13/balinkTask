const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

//usually inserting the password into .env files or from the secured database but here for the task ill do something random
router.post('/login', (req, res) => {
    //mock users
    const user = {
        id:1,
        username:"admin",
        email:"admin@gmail.com"
    }
    jwt.sign({user},"password123" ,(err,token) => {
        res.json({token})
    })
})


module.exports = router;
