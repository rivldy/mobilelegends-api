require("dotenv").config()
require("./config/database").connect()
const express = require("express")

// Authentication
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())

// Logic goes here
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All inputs is required")
    }

    // Check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send("User is already exist. Please login")
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    })

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    )

    // Save our token
    user.token = token

    // Return new user
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
})

app.post("/login", async (req, res) => {
  // Login logics
  try {
    // Get user input
    const { email, password } = req.body

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All inputs is required")
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )

      // Save user token
      user.token = token

      // User
      res.status(200).json(user)
    }
    res.status(400).send("Invalid Credentials")
  } catch (err) {
    console.log(err)
  }
})

module.exports = app
