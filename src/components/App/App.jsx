import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import HeroSection from '../Herosection/HeroSection';
import '../../styles/_variables.scss';

import './App.scss';

function App() {
  return (
    <div className="home-phone">
      <Header />
      <SearchBar />
      <HeroSection />
    </div>
  );
}

export default App;
