// src/App.tsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header >
          <nav>
            <div style={{display:"inline"}}>
              <Link to="/page1">Page1</Link>
              </div>&nbsp;
              <div  style={{display:"inline"}}>
              <Link to="/page2">Page2</Link>
              </div>
          </nav>
          <Routes>
            <Route path="/page1"  element={<Page1/>} />
            <Route path="/page2"  element={<Page2/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};
export default App;
