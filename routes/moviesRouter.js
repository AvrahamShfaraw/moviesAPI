const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { limitActions } = require("../middleware/rateLimit");
const { logUserAction } = require("../middleware/actionLogger"); // <-- log every action
const {
    getAllMovies,
    getMoviesByUser,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

// Apply protect, limitActions, and logUserAction to all routes
router.get("/", protect, limitActions(), logUserAction, getAllMovies);
router.get("/user/:userName", protect, limitActions(), logUserAction, getMoviesByUser);
router.get("/:id", protect, limitActions(), logUserAction, getMovieById);
router.post("/", protect, limitActions(), logUserAction, createMovie);
router.put("/:id", protect, limitActions(), logUserAction, updateMovie);
router.delete("/:id", protect, limitActions(), logUserAction, deleteMovie);

module.exports = router;
