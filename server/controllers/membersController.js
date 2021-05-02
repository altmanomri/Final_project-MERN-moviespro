const {response} = require('express');
const express = require('express');
const router = express.Router();

const memberBL = require('../models/memberBL');

router.route('/')
    .get(async function(req,resp)
    {
        let members = await memberBL.GetAllMembers()
        return resp.json(members);
    });

router.route('/:id')
    .get(async function(req, resp)
    {
        let memberId = req.params.id;
        let member = await memberBL.GetMember(memberId);
        return resp.json(member)
    });

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;

        let result = await memberBL.addMember(obj);
        return resp.json(result);
    });

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let result = await memberBL.updateMember(id,obj);
        return resp.json(result);
    });

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let result = await memberBL.deleteMember(id);
        return resp.json(result);
    });

module.exports = router;