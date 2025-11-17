import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ✅ Customize number per page

  // ✅ Fetch Anime List
  const fetchAnimeList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/anime/`);
      setAnimeList(response.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const handleEpisodeClick = (videoUrl) => {
    setCurrentEpisode(`${BASE_URL}${videoUrl}`);
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(animeList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnime = animeList.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <h2 className="text-center mt-5">Loading Anime List...</h2>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ReadWatchFlix - Anime / Movies / Series</h1>

      {selectedAnime ? (
        <div>
          <h3>{selectedAnime.title}</h3>
          <p><strong>Synopsis:</strong> {selectedAnime.synopsis}</p>
          <p><strong>Rating:</strong> {selectedAnime.rating}</p>
          <p><strong>Language:</strong> {selectedAnime.language}</p>
          <p><strong>Category:</strong> {selectedAnime.category}</p>

          <div className="mb-3">
            {selectedAnime.episodes?.map((episode, index) => (
              <button
                key={index}
                className="btn btn-primary me-2 mb-2"
                onClick={() => handleEpisodeClick(episode.video_file)}
              >
                Episode {index + 1}
              </button>
            ))}
          </div>

          {currentEpisode && (
            <video width="100%" height="400" controls>
              <source src={currentEpisode} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <button className="btn btn-secondary mt-3" onClick={() => setSelectedAnime(null)}>
            🔙 Back to List
          </button>
        </div>
      ) : (
        <div>
          <div className="row">
            {paginatedAnime.length === 0 ? (
              <p>No Anime Found</p>
            ) : (
              paginatedAnime.map((anime) => (
                <div
                  className="col-md-4 mb-4"
                  key={anime.id}
                  onClick={() => setSelectedAnime(anime)}
                >
                  <div className="card shadow-sm" style={{ cursor: "pointer" }}>
                    <img
                      src={anime.image ? `${BASE_URL}${anime.image}` : "https://via.placeholder.com/250x250?text=No+Image"}
                      alt={anime.title}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{anime.title}</h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ✅ Pagination Buttons */}
          <div className="d-flex justify-content-center my-4">
            <button className="btn btn-outline-primary me-2" onClick={goToPrevPage} disabled={currentPage === 1}>
              ◀ Prev
            </button>
            <span className="align-self-center"> Page {currentPage} of {totalPages} </span>
            <button className="btn btn-outline-primary ms-2" onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeList; 