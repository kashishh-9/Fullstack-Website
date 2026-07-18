const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const result = dotenv.config();

console.log(result);
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});