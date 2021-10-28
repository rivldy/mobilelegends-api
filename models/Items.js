const mongoose = require("mongoose")

const ItemSchema = mongoose.Schema({
  id_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attributes: {
    type: Object,
    required: true,
  },
  passive: String,
  story: String,
  image: String,
  category: {
    type: String,
    required: true,
  },
  price: String,
})

module.exports = mongoose.model("Item", ItemSchema)
