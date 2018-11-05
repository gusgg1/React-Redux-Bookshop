"use strict"
import axios from 'axios';


// GET a book
export function getBooks() {
  return function(dispatch) {
    axios.get('/api/books')
      .then(res => {
        dispatch({ type: 'GET_BOOKS', payload: res.data });
      })
      .catch(err => {
        dispatch({ type: 'GET_BOOKS_REJECTED', payload: err });
      });
  }
  // return {
  //   type: 'GET_BOOKS'
  // }
}

// POST book
export function postBooks(book) {
  return function(dispatch) {
    axios.post('/api/books', book)
      .then(function(response) {
        dispatch({ type: "POST_BOOK", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "POST_BOOK_REJECTION", payload: "there was an error while posting a new book" });
      });
  }
  // return {
  //   type: 'POST_BOOK',
  //   payload: book
  // }
}

// DELETE book
export function deleteBooks(id) {
  return function(dispatch) {
    axios.delete('/api/books/' + id)
      .then(res => {
        dispatch({ type: 'DELETE_BOOK', payload:id });
      })
      .catch(err => {
        dispatch({ type: 'DELETE_BOOK_REJECTED', payload: err });
      });
  }
  // return {
  //   type: 'DELETE_BOOK',
  //   payload: id
  // }
}

// UPDATE book
export function updateBooks(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}

// RESET form button
export function resetButton() {
  return {
    type: 'RESET_BUTTON'
  }
}
