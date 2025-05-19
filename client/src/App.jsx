import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ManageSkills from './pages/ManageSkills';
import MatchesPage from './pages/MatchesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/skills' element={<ManageSkills />} />
        <Route path='/matches' element={<MatchesPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
