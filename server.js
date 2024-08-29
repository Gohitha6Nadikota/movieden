const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors"); 
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
app.use(cors());
const url = process.env.REACT_APP_MONGO_URI;
const dbName = "login";
const client = new MongoClient(url);

app.use(express.json());

let db;

client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.post("/api/register", async (req, res) => {
  const { username, password, email, favorites } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
      favorites: favorites || [],
    };

    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully.",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }


    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    }); 

    res
      .status(200)
      .json({ message: "Login successful.", token, userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/addFavorite", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.favorites && user.favorites.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie is already in favorites." });
    }

    await db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(userId) },
        { $push: { favorites: movieId } }
      );

    res.status(200).json({ message: "Movie added to favorites successfully." });
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
