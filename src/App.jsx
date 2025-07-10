import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CommentsPage from './components/CommentsPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Navbar onSearch={setSearchQuery} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CommentsPage searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;