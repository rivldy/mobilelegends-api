const express = require("express")
const router = express.Router()
const Item = require("../models/Items")

// Get all routes
router.get("/", async (req, res) => {
  const items = await Item.find()

  res.json(items)
})

// Create new item
router.post("/new", async (req, res) => {
  const newItem = new Item(req.body)

  const savedItem = await newItem.save()

  res.json(savedItem)
})

// Get specific item by id_name
router.get("/get/:id_name", async (req, res) => {
  const i = await Item.findOne({ id_name: req.params.id_name })

  res.json(i)
})

// Get specific items by category
router.get("/category/:category", async (req, res) => {
  const i = await Item.find({ category: req.params.category })

  res.json(i)
})

// Delete item
router.delete("/delete/:id_name", async (req, res) => {
  const result = await Item.findOneAndDelete({ id_name: req.params.id_name })

  res.json(result)
})

// Update an item
router.patch("/update/:id_name", async (req, res) => {
  const i = await Item.updateOne(
    { id_name: req.params.id_name },
    { $set: req.body }
  )

  res.json(i)
})

module.exports = router
