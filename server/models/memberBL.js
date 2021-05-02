const Member = require('./memberModel');
const express = require('express');


exports.GetAllMembers = () =>
{
    return new Promise((resolve,reject)=>
    {
        Member.find({}, function(err, members)
        {
            if(err)
            {
                reject(err)
            }
            else{
                resolve(members)
            }
        })
    })
};

exports.GetMember = (id) =>
{
    return new Promise((resolve,reject)=>
    {
        Member.findById(id, function(err, member)
        {
            if(err)
            {
                reject(err)
            }
            else{
                resolve(member)
            }
        })
    })
};

exports.addMember = function(mem)
{
    return new Promise((resolve,reject) =>
    {
        let newMember = new Member({
                                        full_name: mem.full_name,
                                        email: mem.email,
                                        city: mem.city
                                    });
        newMember.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Member Created !');
            }
        })
    })
};

exports.updateMember = function(id, updatedMember)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndUpdate(id,{
                                        full_name : updatedMember.full_name,
                                        email : updatedMember.email,
                                        city : updatedMember.city
                                    },
       function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Member Updated !');
            }
        })
    })
};

exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Member Deleted !')
                }
            })
    })
};