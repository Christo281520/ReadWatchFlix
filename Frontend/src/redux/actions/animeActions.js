import axios from 'axios';
import {
  ANIME_LIST_REQUEST, ANIME_LIST_SUCCESS, ANIME_LIST_FAIL,
  MOVIES_LIST_REQUEST, MOVIES_LIST_SUCCESS, MOVIES_LIST_FAIL,
  SERIES_LIST_REQUEST, SERIES_LIST_SUCCESS, SERIES_LIST_FAIL
} from '../constants/animeConstants';

// Fetch All Anime
export const listAnime = () => async (dispatch) => {
  try {
    dispatch({ type: ANIME_LIST_REQUEST });

    const { data } = await axios.get('/api/anime/');

    dispatch({
      type: ANIME_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANIME_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Fetch Movies
export const listMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LIST_REQUEST });

    const { data } = await axios.get('/api/anime/movies/');

    dispatch({
      type: MOVIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIES_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Fetch Series
export const listSeries = () => async (dispatch) => {
  try {
    dispatch({ type: SERIES_LIST_REQUEST });

    const { data } = await axios.get('/api/anime/series/');

    dispatch({
      type: SERIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERIES_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
