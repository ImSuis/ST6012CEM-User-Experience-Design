const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary").v2;

// Initialize dotenv to read .env file
dotenv.config();

// Initialize Express app
const app = express();

// CORS policy
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(multiparty());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Import models and associations
require("./model/userModel");
require("./model/scheduleModel");
require("./model/seatModel");
require("./model/movieModel");
require("./model/locationModel");
require("./model/showtimeModel");
require("./model/association");

// Initialize database
require("./database/init");

// Routes
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/locations", require("./routes/locationRoutes"));
app.use("/api/seats", require("./routes/seatRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));
app.use("/api/showtimes", require("./routes/showtimeRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
