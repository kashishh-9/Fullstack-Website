const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

// POST Contact Form
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        const mongoose = require("mongoose");
        console.log("Route Ready State:", mongoose.connection.readyState);
        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully!"
        });

    } catch (error) {
        console.error("========== ERROR ==========");
        console.error(error);
        console.error("===========================");

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;