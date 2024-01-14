const mongoose = require('mongoose')

const connectDB = async (url) => {
    return mongoose.connect(url).then(() => console.log("MongoDB Connected")).catch((err) => console.log("Connection Error", err))
}

module.exports = {connectDB}