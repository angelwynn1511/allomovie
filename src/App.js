import {React, useState} from 'react';
import './App.css';
import SharedLayout from './components/SharedLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Favorites from './pages/Favorites';
import SingleMovie from './pages/SingleMovie';

function App() {
    const [isSearching, setIsSearching]= useState('');

  return (
    <div className="App">
      <header className="container">
        <div className='routes'>
          <Router>
            <Routes>
              <Route path="/" element={<SharedLayout isSearching={(isSearching)} setIsSearching={(setIsSearching)}/>}>
                <Route path="/" exact element={<Home isSearching={(isSearching)} setIsSearching={(setIsSearching)} />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/details/:movieId" element={<SingleMovie />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
