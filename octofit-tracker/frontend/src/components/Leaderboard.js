import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : '/api';
  const endpoint = `${base}/leaderboard/`;

  useEffect(() => {
    console.log('[Leaderboard] Fetching endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Leaderboard] Raw fetched data:', data);
        if (data && data.results) {
          setItems(data.results);
        } else if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([data]);
        }
      })
      .catch((err) => {
        console.error('[Leaderboard] Fetch error:', err);
        setError(err.message || 'Fetch error');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading leaderboard...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      <p className="text-muted">Endpoint: <code>{endpoint}</code></p>
      {items.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.team}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
