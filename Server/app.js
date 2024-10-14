const express = require("express");
const Razorpay = require('razorpay');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const crypto = require('crypto');

// Middleware to parse JSON
app.use(express.json());

const razorpayInstance = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

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

// Sport Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendor: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

// Lab Schema
const labSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  description: { type: String, required: true },
  Orignalprice: { type: Number, required: true },
  Saleprice: { type: Number, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

const Lab = mongoose.model("Lab", labSchema);

// Function to add multiple lab entries
const addLabs = async (labsArray) => {
  try {
    await Lab.insertMany(labsArray);
    console.log("Labs successfully added to the database.");
  } catch (err) {
    console.error("Error adding labs:", err);
    throw new Error("Could not add labs to the database.");
  }
};

const addMinds = async (MindsArray) => {
  try {
    await Mind.insertMany(MindsArray);
    console.log("Minds successfully added to the database.");
  } catch (err) {
    console.error("Error adding labs:", err);
    throw new Error("Could not add labs to the database.");
  }
};

// Mind Schema
const mindSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  videoUrl: { type: String, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

const Mind = mongoose.model("Mind", mindSchema);


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

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Server error. Could not fetch products.");
  }
});

// Post multiple products via the addProducts function
app.post("/products", async (req, res) => {
  try {
    await addProducts(req.body); // Call the function to add products
    res.status(201).send("Products submitted and saved to database.");
  } catch (err) {
    console.error("Error saving products:", err);
    res.status(500).send("Server error. Could not submit products.");
  }
});

// Get all lab entries
app.get("/labs", async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).send("Server error. Could not fetch labs.");
  }
});

// Post multiple lab entries via the addLabs function
app.post("/labs", async (req, res) => {
  try {
    await addLabs(req.body); // Call the function to add labs
    res.status(201).send("Labs submitted and saved to database.");
  } catch (err) {
    console.error("Error saving labs:", err);
    res.status(500).send("Server error. Could not submit labs.");
  }
});

// Sell a product
app.post("/sell-product", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    if (product.quantity < quantity) {
      return res.status(400).send("Not enough stock available.");
    }

    product.quantity -= quantity;
    await product.save();

    res.status(200).send(`Successfully sold ${quantity} units of ${product.name}`);
  } catch (err) {
    res.status(500).send("Server error. Could not sell the product.");
  }
});

app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: currency,
    receipt: `receipt_order_${Math.random() * 1000}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/verify-payment', (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const body = razorpayOrderId + '|' + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac('sha256', 'YOUR_RAZORPAY_SECRET')
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpaySignature) {
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
});

app.get("/mind", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const minds = await Mind.find()
      .limit(limit * 1) // Convert limit to a number
      .skip((page - 1) * limit)
      .exec();
    const count = await Mind.countDocuments();

    res.status(200).json({
      minds,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error fetching minds:", err);
    res.status(500).send("Server error. Could not fetch minds.");
  }
});


app.post("/mind", async (req, res) => {
  const mindsArray = req.body;

  if (!Array.isArray(mindsArray) || mindsArray.length === 0) {
    return res.status(400).send("Invalid data. An array of minds is required.");
  }

  // Validate that each mind object has the necessary fields
  const isValid = mindsArray.every((mind) =>
    mind.Name && mind.description && mind.image && mind.videoUrl
  );

  if (!isValid) {
    return res.status(400).send("Each mind must have Name, description, image, and videoUrl.");
  }

  try {
    await addMinds(mindsArray);
    res.status(201).send("Minds submitted and saved to the database.");
  } catch (err) {
    console.error("Error saving minds:", err);
    res.status(500).send("Server error. Could not submit minds.");
  }
});

