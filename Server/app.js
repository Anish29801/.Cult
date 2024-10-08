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

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

app.listen(4000, () => {
  console.log("App listening at port 4000");
});

app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).send("Server error. Could not fetch contacts.");
  }
});

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
