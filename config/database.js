const mongoose = require("mongoose")

const { DB } = process.env

exports.connect = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database")
    })
    .catch((err) => {
      console.log("Failed connecting to the database")
      console.error(err)
      process.exit(1)
    })
}
