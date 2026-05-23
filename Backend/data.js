const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// Define schema
const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phoneno: Number,
  id: String,
  email: String,
});

const booksSchema = new mongoose.Schema({
  name: String,
  date: String,
  author: String,
  price: String,
});

const bookIssueSchema = new mongoose.Schema({
  name: String,
  date: String,
  author: String,
  price: String,
  student: String,
});

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const admin = mongoose.model("Admin", adminSchema);
const user = mongoose.model("user", userSchema);
const Book = mongoose.model("books", booksSchema);
const bookIssue = mongoose.model("Issue", bookIssueSchema);
const feedback = mongoose.model("feedback", FeedbackSchema);
// Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors());

app.post("/admin", async (req, res) => {
  const newAdmin = new admin({
    name: req.body.name,
    password: req.body.password,
  });

  try {
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);
    res.send({ success: savedAdmin });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving data");
  }
});

app.post("/user", async (req, res) => {
  const newUser = new user({
    name: req.body.name,
    age: req.body.age,
    phoneno: req.body.phoneno,
  });
  try {
    const savedUser = await newUser.save();
    console.log({ success: savedUser });
  } catch (err) {
    console.log(err);
  }
});

app.post("/addbook", async (req, res) => {
  try {
    const books = req.body;
    console.log("Received data:", books);

    const savedBooks = await Book.insertMany(books);
    res.status(201).json({ success: savedBooks });
  } catch (error) {
    console.error("Error saving books:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/allbooks", async (req, res) => {
  const allbooks = await Book.find({});
  res.send(allbooks);
  console.log(allbooks);
});

app.delete("/allbooksdelete", async (req, res) => {
  const allbooksdelete = await Book.deleteMany({});
  res.send(allbooksdelete);
  console.log(allbooksdelete);
});

app.delete("/allbookdelete", async (req, res) => {
  const allbookdelete = await Book.deleteOne(req.body);
  res.send(allbookdelete);
  console.log(allbookdelete);
});

app.get("/allstudents", async (req, res) => {
  const allStudents = await user.find({});
  try {
    res.send({ success: allStudents });
  } catch (err) {
    console.log(err);
  }
});

app.post("/issue", async (req, res) => {
  const newIssue = new bookIssue(req.body);
  const savedIssue = await newIssue.save();
  res.send({ success: savedIssue });
  console.log(savedIssue);
});

app.get("/issuedbooks", async (req, res) => {
  try {
    const { student } = req.query;

    let findIssue;

    if (student) {
      // For user dashboard
      findIssue = await bookIssue.find({
        student: student,
      });
    } else {
      // For admin dashboard
      findIssue = await bookIssue.find({});
    }

    res.send(findIssue);

    console.log(findIssue);
  } catch (error) {
    console.error("Error fetching issued books:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.delete("/issuebooksdelete", async (req, res) => {
  try {
    const issuedelete = await bookIssue.deleteOne(req.body);
    res.send({ success: issuedelete });
  } catch (err) {
    console.log(err);
  }
});
let requests = [];

app.post("/requestIssue", (req, res) => {
  const newRequest = { ...req.body, id: requests.length + 1 };
  requests.push(newRequest);
  res.json(newRequest);
});

app.get("/requests", (req, res) => {
  res.json(requests);
});

app.post("/approveRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const requestIndex = requests.findIndex((r) => r.id === parseInt(id));
    if (requestIndex !== -1) {
      const request = requests[requestIndex];
      const newIssue = new bookIssue(request);
      await newIssue.save();
      requests = requests.filter((r) => r.id !== parseInt(id));
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: name" });
    }

    const regexName = new RegExp(name, "i");
    const searchResults = await Book.find({ name: { $regex: regexName } });

    console.log(searchResults);
    res.send(searchResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const newUpdate = await Book.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: req.body },
  );
  res.send("done");
});

app.post("/feedback", async (req, res) => {
  const newFeedback = new feedback(req.body);
  const saved = await newFeedback.save();
  res.send(saved);
});

app.get("/getfeedback", async (req, res) => {
  const getFeed = await feedback.find();
  res.send(getFeed);
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
