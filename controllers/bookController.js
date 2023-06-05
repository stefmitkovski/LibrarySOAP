const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
const User = require('../models/userModel')
const Lending = require('../models/lendingModel')

sort_high_function = asyncHandler(async (args) => {
    console.log("Sorting by highest number of pages")
    var SortedBooks = ""
    const books = await Book.find({free: true}).sort({ pages: -1 }) // 1 for ascending order, -1 for descending order

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
    const books = await Book.find({free: true}).sort({ pages: 1 }) // 1 for ascending order, -1 for descending order

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
    const books = await Book.find({ author: search_author })

    if (books.length == 0) {
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

modify_function = asyncHandler(async (args) => {
    console.log("Modifing book data");
    var token = args.token;
    var title = args.title;
    var key = args.key;
    var value = args.value;

    if (!token || !value || !title || !value) {
        return {
            result: "Missing parametars"
        }
    }

    const user = await User.findOne({ token: token })
    if (!user) {
        return {
            result: "The user doesn't exist or isn't logged in currently"
        }
    }

    const book = await Book.findOne({ owner: user._id, title: title, free: true })
    if (!book) {
        return {
            result: "You don't owned that book or is lended to someone"
        }
    }

    switch (key) {
        case "title":
            await Book.findByIdAndUpdate(book._id, { title: value })
            return {
                result: "Successfully updated the title of the book " +title
            }
        case "author":
            await Book.findByIdAndUpdate(book._id, { author: value })
            return {
                result: "Successfully updated the author of the book"
            }
        case "pages":
            await Book.findByIdAndUpdate(book._id, { pages: value })
            return {
                result: "Successfully updated the pages of the book"
            }
    }

    return {
        result: "Invalid key ! The only keys that are allowed are the following: title,author and pages"
    }
})

users_function = asyncHandler(async(args) => {
    console.log("Listing all the users")
    var token = args.token
    var user_string = ""
    if(!token){
        return {
            result: "Forgot to enter a token"
        }
    }
    
    var users = await User.findOne({token: token})
    if(!users){
        return {
            result: "The user either doen't exist or isn't logged in"
        }
    }

    var id = users._id;

    users = await User.find({})
    users.forEach(el => {
            user_string += "Name " + el.name + " | email: " + el.email + ", "
    })

    return {
        result: user_string
    }
})

delete_function = asyncHandler(async(args) =>{
    console.log("Deleting user")
    var token = args.token
    if(!token){
        return {
            result: "Forgot to enter a token"
        }
    }

    var user = await User.findOne({token: token})
    if(!user){
        return {
            result: "The user either doen't exist or isn't logged in"
        }
    }

    var lending_owner = await Lending.findOne({owner: user._id})
    var lending_reciver = await Lending.findOne({reciver: user._id})
    if(lending_owner || lending_reciver){
        return {
            result: "Can't delete the user because he/she is involve in a lending operation"
        }
    }

    await Book.deleteMany({owner: user._id})
    await User.findByIdAndDelete({_id: user._id})

    return {
        result: "Successfully deleted the user !"
    }
})

module.exports = {
    sort_high_function,
    sort_low_function,
    author_function,
    modify_function,
    users_function,
    delete_function
}