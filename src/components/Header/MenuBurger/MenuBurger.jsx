/* eslint-disable react/no-array-index-key */
// Importation des dépendances nécessaires
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import iconBurger from '../../../assets/img/iconBurger.svg';
import { removeAccents } from '../../../utils/removeAccents';

import './MenuBurger.scss';

// Définition du composant MenuBurger
function MenuBurger() {
  // Déclaration de l'état isOpen avec useState
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/view`
      );
      const data = await response.json();
      const fetchedCategories = data.flatMap((recipe) =>
        recipe.categories.map((category) => category.name)
      );
      const uniqueCategories = Array.from(new Set(fetchedCategories));
      setCategories(uniqueCategories);
    } catch (error) {
      // console.error('Erreur lors de la récupération des données :', error);
    }
  };

  // Fonction pour basculer l'état isOpen
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour fermer le menu si le clic est en dehors de .item-list et .burger-button
  const handleOnClose = (e) => {
    if (
      !e.target.closest('.item-list') &&
      !e.target.closest('.burger-button')
    ) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Ajout d'un écouteur d'événements pour fermer le menu lorsqu'un clic est effectué en dehors de .item-list et .burger-button
  useEffect(() => {
    fetchData();
    document.addEventListener('mousedown', handleOnClose);
    return () => {
      // Suppression de l'écouteur d'événements lors du démontage du composant
      document.removeEventListener('mousedown', handleOnClose);
    };
  }, []);

  // Rendu du composant
  return (
    <div className="menu-burger">
      <button
        type="button"
        className="burger-button"
        onClick={handleToggleMenu}
      >
        <img src={iconBurger} alt="Menu Burger" />
      </button>
      {isOpen && (
        <div className="list-burger">
          <div className="list-menu">
            {/* Pour chaque lien, nous avons un div.item-list avec un gestionnaire de clic pour fermer le menu et des attributs pour l'accessibilité */}
            <div className="item-list">
              <NavLink to="/" className="list-text" onClick={handleLinkClick}>
                Accueil
              </NavLink>
              <div className="list-Arrow">{'>'}</div>
            </div>
            {categories.map((category, index) => (
              <div
                key={index}
                className="item-list"
                onClick={() => handleLinkClick(category)} // Modification du gestionnaire de clic pour passer le nom de la catégorie
                onKeyDown={() => handleLinkClick(category)} // Modification du gestionnaire de touche pour passer le nom de la catégorie
                role="button"
                tabIndex={0}
              >
                <NavLink
                  to={`/category/${removeAccents(category).replace(
                    /\s+/g,
                    '-'
                  )}`}
                  className="list-text"
                  onClick={handleOnClose}
                >
                  {category}
                </NavLink>
                <div className="list-Arrow">{'>'}</div>
              </div>
            ))}
            <div
              className="item-list"
              onClick={handleLinkClick}
              onKeyDown={handleLinkClick}
              role="button"
              tabIndex={0}
            >
              <NavLink
                to="/contact"
                className="list-text"
                onClick={handleOnClose}
              >
                Nous contacter
              </NavLink>
              <div className="list-Arrow">{'>'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBurger;
