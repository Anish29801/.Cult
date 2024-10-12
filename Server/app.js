const sampleProducts = [
  {
    "name": "Yoga Mat",
    "vendor": ".Cult",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyGKjbQrUqaRL3ocZhiNTe_hGKj0QEfLK3A&s",
    "price": 1200,
    "quantity": 50
  },
  {
    "name": "Resistance Bands",
    "vendor": ".Cult",
    "image": "https://m.media-amazon.com/images/I/61JYu4FWsJL.jpg",
    "price": 600,
    "quantity": 30
  },
  {
    "name": "Dumbbells",
    "vendor": ".Cult",
    "image": "https://m.media-amazon.com/images/I/61me6zhmaDL.jpg",
    "price": 1400,
    "quantity": 25
  },
  {
    "name": "Running Shoes",
    "vendor": ".Cult",
    "image": "https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/12544338/2022/6/14/c4890db0-a432-4f82-a8b8-96f046b272b91655192914825-HRX-by-Hrithik-Roshan-Men-Navy-Blue-Running-Shoes-1721655192-1.jpg",
    "price": 1300,
    "quantity": 40
  },
  {
    "name": "Sunglasses",
    "vendor": ".Cult",
    "image": "https://i.pinimg.com/originals/62/9d/fb/629dfbe706870a8a68a020afc8faf020.jpg",
    "price": 800,
    "quantity": 20
  },
  {
    "name": "Track Pants",
    "vendor": ".Cult",
    "image": "https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/23802822/2023/10/17/38ad9c61-a74f-4471-9b19-a0d9527a68cd1697532908809-HRX-by-Hrithik-Roshan-Men-Track-Pants-8081697532908302-3.jpg",
    "price": 1000,
    "quantity": 35
  },
  {
    "name": "T-shirt",
    "vendor": ".Cult",
    "image": "https://rukminim1.flixcart.com/image/400/400/t-shirt/y/e/a/1128683-hrx-by-hrithik-roshan-xl-original-imaegpvhdprxddyd.jpeg?q=90",
    "price": 900,
    "quantity": 60
  },
  {
    "name": "Printed T-shirt",
    "vendor": ".Cult",
    "image": "https://meynard-testing.myshopify.com/cdn/shop/products/HRX-Men-Grey-Printed-T-shirt_229cc883f846a988bf3debb018afdaed_images_360_480_mini_large.jpeg?v=1571439126",
    "price": 700,
    "quantity": 45
  },
  {
    "name": "Graphic T-shirt",
    "vendor": ".Cult",
    "image": "https://rukminim1.flixcart.com/image/300/300/t-shirt/b/y/t/1127416-hrx-by-hrithik-roshan-xxl-original-imaegdwmzwhcysq7.jpeg?q=90",
    "price": 500,
    "quantity": 12
  }
]

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

// Sport Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendor: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

// Function to add multiple products
const addProducts = async (productsArray) => {
  try {
    await Product.insertMany(productsArray);
    console.log("Products successfully added to the database.");
  } catch (err) {
    console.error("Error adding products:", err);
    throw new Error("Could not add products to the database.");
  }
};

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

