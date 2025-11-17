import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMovies } from '../redux/actions/animeActions';
import AnimeCard from '../components/AnimeCard';

function Movies() {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.moviesList);
  const { loading, error, movies } = moviesList;

  useEffect(() => {
    dispatch(listMovies());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Anime Movies</h2>
      {loading ? <h4>Loading...</h4> : error ? <h4>{error}</h4> : (
        <div className="row">
          {movies.map((movie) => (
            <AnimeCard key={movie.id} anime={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
