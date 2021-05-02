const Subscription = require('./SubscriptionModel');
const express = require('express');

exports.getAllSubscriptions = () =>
{
    return new Promise((resolve,reject) =>
    {
        Subscription.find({}, function(err, subscriptions)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(subscriptions);
            }
        })
    })
}

exports.getSubscription = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        Subscription.findById(id, function(err, subscription)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(subscription);
            }
        })
    })
}

exports.addSubscription = function(sub)
{
    return new Promise((resolve,reject) =>
    {
        let newSubscription = new Subscription({
                                    movieId : sub.movieId,
                                    memberId : sub.memberId,
                                    date : sub.date,
                                })
        newSubscription.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Subscription Created !');
            }
        })
    })
}

exports.updateSubscription = function(id, updatedSubscription)
{
    return new Promise((resolve,reject) =>
    {
        Subscription.findByIdAndUpdate(id,{
                                        movieId : updatedSubscription.movieId,
                                        memberId : updatedSubscription.memberId,
                                        date : updatedSubscription.date   
                                        },
       function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Subscription Updated !');
            }
        })
    })
};

exports.deleteSubscription = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Subscription.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Subscription Deleted !')
                }
            })
    })
}
