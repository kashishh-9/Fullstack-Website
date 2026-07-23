const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

// Load environment variables
dotenv.config();

// Force Node.js to use public DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Verify DNS servers being used
console.log("DNS Servers:", dns.getServers());

// Create Express app
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
    console.error("❌ MongoDB Error:", err);
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