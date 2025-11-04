import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : '/api';
  const endpoint = `${base}/activities/`;

  useEffect(() => {
    console.log('[Activities] Fetching endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Activities] Raw fetched data:', data);
        if (data && data.results) {
          setItems(data.results);
        } else if (Array.isArray(data)) {
          setItems(data);
        } else {
          // handle single-object responses by wrapping
          setItems([data]);
        }
      })
      .catch((err) => {
        console.error('[Activities] Fetch error:', err);
        setError(err.message || 'Fetch error');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="container mt-4">Loading activities...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Activities</h2>
      <p className="text-muted">Endpoint: <code>{endpoint}</code></p>
      {items.length === 0 ? (
        <div className="alert alert-info">No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.user}</td>
                  <td>{item.activity}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
