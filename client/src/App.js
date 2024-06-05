import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import Intro from "./pages/Intro";
import Board from './components/board/Board';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Intro />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/Board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
