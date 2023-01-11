const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please enter the title of the book']
    },
    author: {
        type: String,
        require: [true, 'Please enter the author']
    },
    pages: {
        type: Number,
        require: [true, 'Please enter the number of pages that the book has']
    },
    status: {
        type: String,
        enum: ['free','lended'],
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Book', bookSchema)
