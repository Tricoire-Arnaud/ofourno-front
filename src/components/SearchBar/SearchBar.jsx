import React from 'react';
import search from '../../assets/search.svg';
import './SearchBar.scss';

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-bar-wrapper">
        <div className="div">
          <img className="search" alt="Search" src={search} />
          <div className="text-wrapper">Texte de recherche</div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
