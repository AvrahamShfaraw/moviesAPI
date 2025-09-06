const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDb");

const app = express();
app.use(express.json());

connectDB();

const moviesRoutes = require("./routes/moviesRouter");
const authRoutes = require("./routes/authRouter");
const actionsRouter = require("./routes/actionsRouter");

app.use("/api/movies", moviesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/actions", actionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
