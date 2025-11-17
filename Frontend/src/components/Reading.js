import React, { useEffect, useState } from "react";
import axios from "axios";

function Reading() {
  const [readingList, setReadingList] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/reading/`)
      .then(response => {
        setReadingList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching reading content:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading Reading Content...</h2>;

  // Group by category
  const grouped = {
    manga: readingList.filter(item => item.category === "manga"),
    manhua: readingList.filter(item => item.category === "manhua"),
    manhwa: readingList.filter(item => item.category === "manhwa"),
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ReadWatchFlix - Reading Section</h1>

      {selectedReading ? (
        <div>
          <h3>{selectedReading.title}</h3>
          <p><strong>Synopsis:</strong> {selectedReading.synopsis}</p>
          <p><strong>Rating:</strong> {selectedReading.rating}</p>
          <p><strong>Category:</strong> {selectedReading.category}</p>

          <div className="mb-3">
            {selectedReading.chapters && selectedReading.chapters.map((chapter, index) => (
              <a
                key={index}
                className="btn btn-primary me-2 mb-2"
                href={`${BASE_URL}${chapter.chapter_file}`}
                target="_blank"
                rel="noreferrer"
              >
                Chapter {index + 1}
              </a>
            ))}
          </div>

          <button className="btn btn-secondary mt-3" onClick={() => setSelectedReading(null)}>
            Back to List
          </button>
        </div>
      ) : (
        <>
          {['manga', 'manhua', 'manhwa'].map((category) => (
            <div key={category} className="mb-5">
              <h4 className="mb-3 text-capitalize">{category}</h4>
              <div className="row">
                {grouped[category].length === 0 ? (
                  <p>No {category} found</p>
                ) : (
                  grouped[category].map((item) => (
                    <div
                      className="col-md-4 mb-4"
                      key={item.id}
                      onClick={() => setSelectedReading(item)}
                    >
                      <div className="card shadow-sm" style={{ cursor: "pointer" }}>
                        <img
                          src={item.image ? `${BASE_URL}${item.image}` : "https://via.placeholder.com/250x250?text=No+Image"}
                          alt={item.title}
                          className="card-img-top"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-center">{item.title}</h5>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Reading;