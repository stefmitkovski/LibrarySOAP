const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
const Lending = require('../models/lendingModel')

sort_high_function = asyncHandler(async (args) => {
    var SortedBooks = ""
    const books = await Book.find().sort({ pages: -1 }) // 1 for ascending order, -1 for descending order

    books.forEach(el => {
        SortedBooks += "Title: " + el.title + "| Author: " + el.author + "| Pages: " + el.pages + ", "
    });
    return {
        result: SortedBooks
    }
});

sort_low_function = asyncHandler(async (args) => {
    var SortedBooks = ""
    const books = await Book.find().sort({ pages: 1 }) // 1 for ascending order, -1 for descending order

    books.forEach(el => {
        SortedBooks += "Title: " + el.title + "| Author: " + el.author + "| Pages: " + el.pages + ", "
    });
    return {
        result: SortedBooks
    }
});

module.exports = {
    sort_high_function,
    sort_low_function
}