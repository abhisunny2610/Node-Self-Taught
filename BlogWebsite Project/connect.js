const mongoose = require("mongoose")

const connectMongoDb = async () => {
    return mongoose.connect("mongodb://localhost:27017/blogify")
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("Connection Error", err))
}

module.exports = { connectMongoDb }