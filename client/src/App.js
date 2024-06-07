import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LibraryParkMap from './components/LibraryParkMap';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Library and Park Finder</h1>
        </header>
        <Routes>
          <Route path="/" element={<LibraryParkMap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


