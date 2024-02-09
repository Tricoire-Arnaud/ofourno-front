import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import HeroSection from '../Herosection/HeroSection';
import Sign from '../Sign/Sign';
import '../../styles/_variables.scss';

import './App.scss';

function App() {
  return (
    <div className="home-phone">
      <Header />
      <SearchBar />
      <HeroSection />
      <Sign />
    </div>
  );
}

export default App;
