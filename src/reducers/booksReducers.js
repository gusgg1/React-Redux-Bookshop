"use strict"

// BOOKS REDUCERS
export function booksReducers(state={
  books: []
  }, action) {
  switch(action.type) {
    case 'GET_BOOKS':
    return {...state, books: [...action.payload]}
    break;

    case 'POST_BOOK':
    // let books = state.books.concat(action.payload);
    // return {books};
    return {...state, books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style: 'success', validation: 'success'}
    break;

    case 'POST_BOOK_REJECTED':
    return {...state, msg: 'Please, try again', style: 'danger', validation: 'error'}
    break;

    case 'RESET_BUTTON':
    return {...state, msg: null, style: 'primary', validation: null}
    break;

    case 'DELETE_BOOK':
    // create copy of the current array of books
    const currentBookToDelete = [...state.books]
    // determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(function(book) {
      return book._id == action.payload;
    });
    // use slice to remove the book at the specified index
    return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]};
    break;

    case 'UPDATE_BOOK':
    // create a copy of the current array of books
    const currentBookToUpdate = [...state.books];
    const indexToUpdate = currentBookToUpdate.findIndex(function(book) {
      return book._id === action.payload._id;
    });
    // create a new book obj with the new values and with the same array index of the item we want
    // to replace. To ahieve this we will use ...spread but we could use concat method too
    const newBookToUpdate = {...currentBookToUpdate[indexToUpdate], title: action.payload.title}
    // logging how the new updated book looks like
    console.log("the new updated book: ", newBookToUpdate);
    // use slice method to remove the book at the specified index, replace with the new obj and concatenate with the rest of items in the array
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]};
    break;
  }
  return state
}
