import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-4">OctoFit Tracker</h1>
          <p className="lead mb-4">Welcome to the OctoFit Tracker frontend scaffold.</p>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Track Your Fitness Journey</h5>
              <p className="card-text">Monitor activities, workouts, teams, and compete on the leaderboard!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src="/octofitapp-small.png" alt="OctoFit Logo" className="logo" />
            OctoFit
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
