const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Set up CORS
const corsOptions = {
  origin: "http://localhost:8080",
  methods: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contact-form")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true });

const FAQ = mongoose.model("FAQ", faqSchema);

// Start the server
app.listen(4000, () => {
  console.log("App listening at port 4000");
});

// Get all contacts
app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).send("Server error. Could not fetch contacts.");
  }
});

// Post a new contact
app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await newContact.save();

    res.status(201).send("Contact form submitted and saved to database.");
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).send("Server error. Could not submit form.");
  }
});

// Get all FAQs
app.get("/faq", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).send("Server error. Could not fetch FAQs.");
  }
});

// Post a new FAQ
app.post("/faq", async (req, res) => {
  try {
    const newFAQ = new FAQ({
      question: req.body.question,
      answer: req.body.answer,
    });

    await newFAQ.save();

    res.status(201).send("FAQ submitted and saved to database.");
  } catch (err) {
    console.error("Error saving FAQ:", err);
    res.status(500).send("Server error. Could not submit FAQ.");
  }
});

