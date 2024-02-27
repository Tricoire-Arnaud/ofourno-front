import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import CardResult from '../../components/Cardresult/Cardresult'; // Importation du composant CardResult

import './Results.scss';

function Results() {
  const navigate = useNavigate(); // Hook pour naviguer entre les routes
  const { state } = useLocation(); // Hook pour accéder à l'état de la location actuelle
  const [allDishes, setAllDishes] = useState([]); // État pour stocker tous les plats
  const [filteredDishes, setFilteredDishes] = useState([]); // État pour stocker les plats filtrés
  const [filtersActive, setFiltersActive] = useState(false); // État pour savoir si les filtres sont actifs

  useEffect(() => {
    // Récupération initiale de toutes les recettes
    api
      .get('/recipes/view')
      .then((response) => {
        setAllDishes(response.data); // Mise à jour de l'état allDishes avec les données de la réponse
        // Filtrage immédiat basé sur le searchTerm récupéré de l'état de navigation
        const searchTerm = state?.searchTerm?.toLowerCase() || '';
        const filtered = searchTerm
          ? response.data.filter((dish) =>
              dish.name.toLowerCase().includes(searchTerm)
            )
          : response.data;
        setFilteredDishes(filtered); // Mise à jour de l'état filteredDishes avec les plats filtrés
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des recettes:', error);
      });
  }, [state?.searchTerm]); // Dépendance au searchTerm pour recharger les résultats lorsque le terme change

  const handleFilterClick = () => {
    setFiltersActive(true); // Activation des filtres
    navigate('/filters', {
      state: { allDishes, filteredDishes, filtersActive }, // Passage de l'état actuel à la route /filters
    });
  };

  return (
    <div className="results">
      <div className="search-results-heading">Résultats de votre recherche</div>
      <button
        type="button"
        onClick={handleFilterClick}
        className={`filter-button ${filtersActive ? 'active' : ''}`}
      >
        Appliquez des filtres
      </button>
      {filteredDishes.length > 0 ? (
        filteredDishes.map((dish) => (
          <CardResult
            key={dish.id}
            id={dish.id}
            imageUrl={dish.picture}
            dishName={dish.name}
            rating={dish.rating}
          />
        ))
      ) : (
        <div className="no-results">
          <h2>Désolé, aucune recette trouvée.</h2>
          <p>Veuillez essayer avec un autre terme de recherche.</p>
        </div>
      )}
    </div>
  );
}

export default Results;
