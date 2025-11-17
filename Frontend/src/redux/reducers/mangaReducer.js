import {
    MANGA_LIST_REQUEST,
    MANGA_LIST_SUCCESS,
    MANGA_LIST_FAIL,
  } from '../constants/mangaConstants';
  
  export const mangaReducer = (state = { mangas: [] }, action) => {
    switch (action.type) {
      case MANGA_LIST_REQUEST:
        return { loading: true, mangas: [] };
      case MANGA_LIST_SUCCESS:
        return { loading: false, mangas: action.payload };
      case MANGA_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  