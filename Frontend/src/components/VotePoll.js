import React, { useEffect, useState } from "react";
import axios from "axios";

function VotePoll() {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const BASE_URL = "http://127.0.0.1:8000";

  // Fetch the poll when component loads or after voting
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/vote_poll/`)
      .then((res) => setPoll(res.data))
      .catch((err) => console.error("Error fetching poll:", err));
  }, [voted]);

  // Handle vote button click
  const handleVote = (index) => {
    axios
      .post(`${BASE_URL}/api/vote/`, { option_id: poll.options[index].id })
      .then(() => setVoted(true))
      .catch((err) => console.error("Error voting:", err));
  };

  // Show loading state
  if (!poll || !poll.options) return <p className="text-center">Loading...</p>;

  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{poll.question}</h2>

      {poll.options.map((option, i) => {
        const percent = totalVotes ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;

        return (
          <div key={i} className="card mb-4 shadow-sm">
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src={`${BASE_URL}${option.image}`}
                  alt={option.name}
                  className="img-fluid rounded-start"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{option.name}</h5>

                  <button
                    className="btn btn-outline-primary w-100 mt-2"
                    onClick={() => handleVote(i)}
                    disabled={voted}
                  >
                    Vote
                  </button>

                  {voted && (
                    <div className="progress mt-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percent}%` }}
                      >
                        {percent}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VotePoll;
