const {response} = require('express');
const express = require('express');
const router = express.Router();

const usersBL = require('../models/userBL');


router.route('/')
    .get(async function(req,resp)
    {
        let users = await usersBL.getAllUsers()
        return resp.json(users);
    });

router.route('/:id')
    .get(async function(req, resp)
    {
        let userId = req.params.id;
        let user = await usersBL.getUser(userId);
        return resp.json(user)
    });

router.route('/:userName')
    .get(async function(req, resp)
    {
        let userName = req.params.userName;
        let user = await usersBL.getUser(userName);
        return resp.json(user)
    });

router.route('/login')
    .post(async function(req, resp) {
        let users = await usersBL.getAllUsers();
        let result = users.find(user => user.username == req.body.username);
        if(result){
            if(result.password == req.body.password){
                let fullName = result.full_Name
                console.log(fullName)
               // let isLoggedIn = true; 
                let logData  = {
                    fullName : result.full_Name,
                    isLoggedIn : true
                }          
                 resp.json(logData)                 
            }
            else{
                 resp.send("Password is invalid")
            }
        } else {
             resp.send("User not found")
        }
    });

module.exports = router;
