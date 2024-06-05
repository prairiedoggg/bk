import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Board from './components/board/Board';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
