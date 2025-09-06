const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getAllMovies,
    getMoviesByUser,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

router.get("/", protect, getAllMovies);
router.get("/user/:userName", protect, getMoviesByUser);
router.get("/:id", protect, getMovieById);
router.post("/", protect, createMovie);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);

module.exports = router;
