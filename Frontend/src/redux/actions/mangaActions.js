import axios from 'axios';
import {
  MANGA_LIST_REQUEST,
  MANGA_LIST_SUCCESS,
  MANGA_LIST_FAIL,
} from '../constants/mangaConstants';

export const listManga = () => async (dispatch) => {
  try {
    dispatch({ type: MANGA_LIST_REQUEST });

    const { data } = await axios.get('/api/manga/');

    dispatch({
      type: MANGA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MANGA_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
