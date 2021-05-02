const {response} = require('express');
const express = require('express');
const router = express.Router();

const moviesBL = require('../models/movieBL');

router.route('/')
    .get(async function(req,resp)
    {
        let movies = await moviesBL.getAllMovies()
        return resp.json(movies);
    });

router.route('/:id')
    .get(async function(req, resp)
    {
        let movieId = req.params.id;
        let movie = await moviesBL.getMovie(movieId);
        return resp.json(movie)
    });

router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        console.log(req.body)
        let movie = await moviesBL.addMovie(obj);
        return resp.json(movie);
    });

router.route('/:id')
.put(async function(req,resp)
{
    let obj = req.body;
    let id = req.params.id;
    let result = await moviesBL.updateMovie(id,obj);
    return resp.json(result);
});

router.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id;
    let result = await moviesBL.deleteMovie(id);
    return resp.json(result);
});


module.exports = router;
