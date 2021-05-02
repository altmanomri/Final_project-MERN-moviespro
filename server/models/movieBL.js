const Movie = require('./movieModel');
const express = require('express');

exports.getAllMovies = () =>
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err, movies)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(movies);
            }
        })
    })
}

exports.getMovie = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        Movie.findById(id, function(err, movie)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(movie);
            }
        })
    })
}

exports.addMovie = function(mov)
{
    return new Promise((resolve,reject) =>
    {
        let newMovie = new Movie({
                                    name : mov.name,
                                    yearPremiered : mov.yearPremiered,
                                    image : mov.image,
                                    genres : mov.genres
                                })
        newMovie.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('movie Created !');
            }
        })
    })
}

exports.updateMovie = function(id, updatedMovie)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndUpdate(id,{
                                        name : updatedMovie.name,
                                        yearPremiered : updatedMovie.yearPremiered,
                                        image : updatedMovie.image,
                                        genres : updatedMovie.genres,
                                    },
       function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('movie Updated !');
            }
        })
    })
};

exports.deleteMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Movie Deleted !')
                }
            })
    })
}
