import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/homepage/item-details/${id}/`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [id]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="container text-white mt-5">
      <h2>{details.title}</h2>
      <img src={`http://localhost:8000${details.image}`} alt={details.title} className="img-fluid" />
      <p>{details.synopsis}</p>
      <p>Rating: {details.rating}</p>
      {/* Add more details as per your model */}
    </div>
  );
};

export default DetailsPage;
