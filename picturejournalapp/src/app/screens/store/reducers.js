import {
  GET_BOOKS,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  GET_LOCATION,
} from './actions';

const initialState = {
  books: [],
  bookmarks: [],
  location: [],
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {...state, books: action.payload};
    case GET_LOCATION:
      console.log(action.payload);
      return {...state, location: action.payload};
    case ADD_TO_BOOKMARK_LIST:
      return {...state, bookmarks: [...state.bookmarks, action.payload]};
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          book => book.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default booksReducer;
