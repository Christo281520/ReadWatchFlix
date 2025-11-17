import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [homeSections, setHomeSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 For search
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/homepage/home-sections/`)
      .then(response => {
        setHomeSections(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching home sections:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading Home Content...</h2>;

  // ✅ Group by section_type (upcoming_anime, upcoming_movies, etc.)
  const grouped = {};
  homeSections.forEach((item) => {
    if (!grouped[item.section_type]) {
      grouped[item.section_type] = [];
    }
    grouped[item.section_type].push(item);
  });

  // ✅ Filtered search result
  const filteredSections = {};
  Object.keys(grouped).forEach((sectionType) => {
    filteredSections[sectionType] = grouped[sectionType].filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ReadWatchFlix - Home</h1>

      {/* ✅ Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {selectedItem ? (
        <div>
          <h3>{selectedItem.title}</h3>
          <img
            src={selectedItem.image ? selectedItem.image : "https://via.placeholder.com/400x250?text=No+Image"}
            alt={selectedItem.title}
            className="img-fluid mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <p><strong>Description:</strong> {selectedItem.description}</p>
          {selectedItem.video && (
            <video controls width="100%">
              <source src={selectedItem.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <button className="btn btn-secondary mt-3" onClick={() => setSelectedItem(null)}>
            Back to Home Sections
          </button>
        </div>
      ) : (
        <>
          {Object.keys(filteredSections).map((sectionType) =>
            filteredSections[sectionType].length > 0 && (
              <div key={sectionType} className="mb-5">
                <h4 className="mb-3 text-capitalize">
                  {sectionType.replace("_", " ")}
                </h4>
                <div className="row">
                  {filteredSections[sectionType].map((item) => (
                    <div
                      className="col-md-4 mb-4"
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="card shadow-sm" style={{ cursor: "pointer" }}>
                        <img
                          src={item.image ? item.image : "https://via.placeholder.com/250x250?text=No+Image"}
                          alt={item.title}
                          className="card-img-top"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-center">{item.title}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
