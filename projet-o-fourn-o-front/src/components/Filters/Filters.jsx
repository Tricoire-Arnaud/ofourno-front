import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api';
import './Filters.scss';

// Ce composant gère les filtres pour les plats
function Filters() {
  // Utilisation du hook useLocation pour accéder à l'état de l'objet location
  const { state } = useLocation();
  // Initialisation des états pour les plats filtrés, les filtres actifs et les options sélectionnées
  const [setFilteredDishes] = useState(state?.filteredDishes || []);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  // Fonction pour gérer le clic sur un filtre
  const handleFilterClick = (filter) => {
    setActiveFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  // Fonction pour gérer le clic sur une option de filtre
  const handleOptionClick = (filter, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [filter]: prevState[filter]?.includes(option)
        ? prevState[filter].filter((o) => o !== option)
        : [...(prevState[filter] || []), option],
    }));
  };

  // Fonction pour gérer la soumission des filtres
  const handleSubmit = () => {
    api
      .get('', { params: activeFilters })
      .then((response) => {
        setFilteredDishes(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  // Fonction pour rendre la liste des filtres
  const renderFilterList = (filter) => {
    if (!activeFilters[filter]) return null;

    let filters;
    switch (filter) {
      case 'type':
        filters = ['Entrée', 'Plat', 'Dessert', 'Apéritif'];
        break;
      case 'prepTime':
        filters = ['< 15 minutes', '< 30 minutes', '< 45 minutes', '< 1 heure'];
        break;
      case 'difficulty':
        filters = ['Facile', 'Moyen', 'Intermédiaire', 'Difficile'];
        break;
      case 'budget':
        filters = ['€', '€€', '€€€', '€€€€'];
        break;
      case 'serves':
        filters = ['< 2', '< 4', '< 6', '< 8'];
        break;
      case 'rating':
        filters = ['1', '2', '3', '4', '5'];
        break;
      default:
        filters = [];
    }

    return (
      <ul className="filter-list">
        {filters.map((option, index) => (
          <li key={index} className="filter-option">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={selectedOptions[filter]?.includes(option) || false}
              onChange={() => handleOptionClick(filter, option)}
            />
            <span className="filter-label">{option}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Rendu du composant
  return (
    <div className="filters">
      <div className="search-results-heading">Résultats de votre recherche</div>
      <button className="filter-btn" onClick={() => handleFilterClick('type')}>
        Type <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('type')}
      <hr />
      <button
        className="filter-btn"
        onClick={() => handleFilterClick('prepTime')}
      >
        Temps de préparation <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('prepTime')}
      <hr />
      <button
        className="filter-btn"
        onClick={() => handleFilterClick('difficulty')}
      >
        Difficulté <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('difficulty')}
      <hr />
      <button
        className="filter-btn"
        onClick={() => handleFilterClick('budget')}
      >
        Budget <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('budget')}
      <hr />
      <button
        className="filter-btn"
        onClick={() => handleFilterClick('serves')}
      >
        Personnes <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('serves')}
      <hr />
      <button
        className="filter-btn"
        onClick={() => handleFilterClick('rating')}
      >
        Note <span className="arrow">{'>'}</span>
      </button>
      {renderFilterList('rating')}
      <hr />
      <button className="submit-btn" onClick={handleSubmit}>
        Filtrer
      </button>
    </div>
  );
}

export default Filters;
