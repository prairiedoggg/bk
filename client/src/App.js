import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Intro from './pages/Intro';
import Board from './components/board/Board';
import Mypage from './pages/Mypage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/board' element={<Board />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
