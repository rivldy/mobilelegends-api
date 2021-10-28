const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// Create Express
const app = express()

// Database
const dbUrl = process.env.DB || "mongodb://localhost/mobilelegends-api"
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.once("open", () => {
  console.log("Connected to MongoDB Database...")
})

// Use Cors
app.use(cors())

// Middleware
app.use(bodyParser.json())

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!")
})

const ItemsRoutes = require("./routes/Items")

app.use("/items", ItemsRoutes)

// Starting Server
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listening on port ${PORT}`))
