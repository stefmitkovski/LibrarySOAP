const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
const Lending = require('../models/lendingModel')

sort_high_function = asyncHandler(async (args) => {
    console.log("Sorting by highest number of pages")
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
    console.log("Sorting by lowest number of pages")
    var SortedBooks = ""
    const books = await Book.find().sort({ pages: 1 }) // 1 for ascending order, -1 for descending order

    books.forEach(el => {
        SortedBooks += "Title: " + el.title + "| Author: " + el.author + "| Pages: " + el.pages + ", "
    });
    return {
        result: SortedBooks
    }
});

author_function = asyncHandler(async (args) => {
    console.log("Getting all books from a specific author")
    var SortedBooks = ""
    var search_author = args.author
    const books = await Book.find({author: search_author})

    if(books.length == 0){
        return {
            result: "No books by that author"
        }
    }
    books.forEach(el => {
        SortedBooks += "Title: " + el.title + "| Author: " + el.author + "| Pages: " + el.pages + ", "
    });
    return {
        result: SortedBooks
    }
});

module.exports = {
    sort_high_function,
    sort_low_function,
    author_function
}