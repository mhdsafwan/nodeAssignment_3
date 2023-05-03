const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/userModel");
const winston = require("winston");
const app = express();

//Middleware
app.use(express.json());

// logger config
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

//routes
app.get("/", (req, res) => {
  res.send("Hello node api working and mongoDB connected!!!");
});

//fetching the data from mondoDB
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
    logger.info("Users fetched successfully");
  } catch (error) {
    logger.error(`Error occurred while fetching users: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//posting the data into mongoDB
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
    logger.info("Users created successfully");
  } catch (error) {
    logger.error(`Error occurred while creating users: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//updating data by id
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannor find any product with Id ${id}` });
    }
    logger.info("Users updated successfully");
    const UpdatedUser = await User.findById(id, req.body);
    res.status(200).json(UpdatedUser);
  } catch (error) {
    logger.error(`Error occurred while updating users: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});
//connecting the mongoDB
mongoose
  .connect(
    "mongodb+srv://safwan68:Safwan_68@cluster0.1cz4v88.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000, () => {
      console.log(`Server listening on port 3000!`);
    });
  })
  .catch(() => {
    console.log(console.error);
  });

module.exports = app;
