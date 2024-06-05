import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
