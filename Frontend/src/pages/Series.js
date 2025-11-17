import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSeries } from '../redux/actions/animeActions';
import AnimeCard from '../components/AnimeCard';

function Series() {
  const dispatch = useDispatch();
  const seriesList = useSelector((state) => state.seriesList);
  const { loading, error, series } = seriesList;

  useEffect(() => {
    dispatch(listSeries());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Anime Series</h2>
      {loading ? <h4>Loading...</h4> : error ? <h4>{error}</h4> : (
        <div className="row">
          {series.map((show) => (
            <AnimeCard key={show.id} anime={show} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Series;
