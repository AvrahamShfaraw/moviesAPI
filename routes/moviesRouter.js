const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { limitActions } = require("../middleware/rateLimit"); // <-- import rate limit middleware
const {
    getAllMovies,
    getMoviesByUser,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

// Protected routes
router.get("/", protect, getAllMovies);
router.get("/user/:userName", protect, getMoviesByUser);
router.get("/:id", protect, getMovieById);

// Routes with daily action limit (10 actions per user per day)
router.post("/", protect, limitActions(), createMovie);
router.put("/:id", protect, limitActions(), updateMovie);
router.delete("/:id", protect, limitActions(), deleteMovie);

module.exports = router;
