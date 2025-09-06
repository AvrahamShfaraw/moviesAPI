const Movie = require("../models/Movie");

// GET all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET movies by user
const getMoviesByUser = async (req, res) => {
    try {
        const { userName } = req.params;
        const movies = await Movie.find({ uploadByUserName: userName });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET single movie
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST new movie
const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT update movie
const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: "Movie not found" });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE movie
const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Movie not found" });
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllMovies,
    getMoviesByUser,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
