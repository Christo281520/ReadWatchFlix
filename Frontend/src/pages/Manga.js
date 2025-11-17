import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listManga } from '../redux/actions/mangaActions';
import MangaCard from '../components/MangaCard';

function Manga() {
  const dispatch = useDispatch();
  const mangaList = useSelector((state) => state.mangaList);
  const { loading, error, mangas } = mangaList;

  useEffect(() => {
    dispatch(listManga());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Manga Section</h2>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <h4>{error}</h4>
      ) : (
        <div className="row">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Manga;
