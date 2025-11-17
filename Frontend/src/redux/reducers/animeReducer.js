import {
    ANIME_LIST_REQUEST, ANIME_LIST_SUCCESS, ANIME_LIST_FAIL,
    MOVIES_LIST_REQUEST, MOVIES_LIST_SUCCESS, MOVIES_LIST_FAIL,
    SERIES_LIST_REQUEST, SERIES_LIST_SUCCESS, SERIES_LIST_FAIL
  } from '../constants/animeConstants';
  
  export const animeReducer = (state = { anime: [] }, action) => {
    switch (action.type) {
      case ANIME_LIST_REQUEST:
        return { loading: true, anime: [] };
      case ANIME_LIST_SUCCESS:
        return { loading: false, anime: action.payload };
      case ANIME_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const moviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
      case MOVIES_LIST_REQUEST:
        return { loading: true, movies: [] };
      case MOVIES_LIST_SUCCESS:
        return { loading: false, movies: action.payload };
      case MOVIES_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const seriesReducer = (state = { series: [] }, action) => {
    switch (action.type) {
      case SERIES_LIST_REQUEST:
        return { loading: true, series: [] };
      case SERIES_LIST_SUCCESS:
        return { loading: false, series: action.payload };
      case SERIES_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  