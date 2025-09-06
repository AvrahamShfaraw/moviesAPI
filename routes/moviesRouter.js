const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { limitActions } = require("../middleware/rateLimit");
const {
    getAllMovies,
    getMoviesByUser,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

// Apply both protect and limitActions middleware to ALL routes
router.get("/", protect, limitActions(), getAllMovies);
router.get("/user/:userName", protect, limitActions(), getMoviesByUser);
router.get("/:id", protect, limitActions(), getMovieById);
router.post("/", protect, limitActions(), createMovie);
router.put("/:id", protect, limitActions(), updateMovie);
router.delete("/:id", protect, limitActions(), deleteMovie);

module.exports = router;
