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

<div
  className="SearchBar"
  style={{
    width: '100%',
    height: '100%',
    paddingLeft: 77,
    paddingRight: 77,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'inline-flex',
  }}
>
  <div
    className="SearchBar"
    style={{
      flex: '1 1 0',
      alignSelf: 'stretch',
      paddingLeft: 10,
      paddingRight: 10,
      background: 'white',
      borderRadius: 10,
      border: '2px #9CB7C9 solid',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 20,
      display: 'flex',
    }}
  >
    <div
      className="Vector"
      style={{ width: 26, height: 26, background: '#ECA457' }}
    ></div>
    <div
      className="TexteDeRecherche"
      style={{
        flex: '1 1 0',
        alignSelf: 'stretch',
        color: 'rgba(0, 0, 0, 0.36)',
        fontSize: 14,
        fontFamily: 'American Typewriter',
        fontWeight: '400',
        wordWrap: 'break-word',
      }}
    >
      Texte de recherche
    </div>
  </div>
</div>;
