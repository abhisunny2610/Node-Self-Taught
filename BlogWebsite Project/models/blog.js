const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: {type: String, required:false},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    // tags: [{ type: String }],
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
}, {timestamps: true})

const Blog = model("blog", blogSchema)

module.exports = Blog