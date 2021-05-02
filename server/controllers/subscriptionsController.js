const {response} = require('express');
const express = require('express');
const router = express.Router();

const subscriptionsBL = require('../models/subscriptionBL');

router.route('/')
    .get(async function(req,resp)
    {
        let subscriptions = await subscriptionsBL.getAllSubscriptions()
        return resp.json(subscriptions);
    });

router.route('/:id')
    .get(async function(req, resp)
    {
        let subscriptionId = req.params.id;
        let subscription = await subscriptionsBL.getSubscription(subscriptionId);
        return resp.json(subscription)
    });

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        console.log(req.body)
        let subscription = await subscriptionsBL.addSubscription(obj);
        return resp.json(subscription);
    });

router.route('/:id')
.put(async function(req,resp)
{
    let obj = req.body;
    let id = req.params.id;
    console.log('id', id)
    console.log('obj', obj)
    let result = await subscriptionsBL.updateSubscription(id,obj);
    return resp.json(result);
});

router.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id;
    let result = await subscriptionsBL.deleteSubscription(id);
    return resp.json(result);
});



    module.exports = router;