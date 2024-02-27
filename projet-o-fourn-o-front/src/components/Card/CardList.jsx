/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api';
import Card from './Card';
import './CardList.scss';

import chevronRight from '../../assets/img/chevronRight.svg';
import chevronLeft from '../../assets/img/chevronLeft.svg';

// Définition du composant CardList
function CardList() {
  // Utilisation du hook useSelector pour accéder aux favoris dans le state de Redux
  const favorites = useSelector((state) => state.favorites);
  // Définition d'un état pour stocker les plats
  const [dishes, setDishes] = useState([]);
  // Définition d'un état pour stocker le nombre de plats à afficher à la fois
  const [scrollAmount, setScrollAmount] = useState(2);

  // Utilisation du hook useEffect pour récupérer les plats et le nombre d'avis pour chaque plat
  useEffect(() => {
    const fetchDishesAndReviews = async () => {
      try {
        // Récupérer les recettes
        const response = await api.get('/recipes/random');
        const dishesData = response.data;

        // Pour chaque recette, récupérer le nombre d'avis et enrichir les données de la recette
        const dishesWithReviewCount = await Promise.all(
          dishesData.map(async (dish) => {
            try {
              const reviewResponse = await api.get(
                `/recipes/${dish.id}/review/count`
              );
              return { ...dish, reviewCount: reviewResponse.data.count };
            } catch (error) {
              console.error(
                "Erreur lors de la récupération du nombre d'avis:",
                error
              );
              return { ...dish, reviewCount: 0 }; // Gérer l'erreur en attribuant 0 avis
            }
          })
        );

        setDishes(dishesWithReviewCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDishesAndReviews();
  }, []);

  // Utilisation du hook useEffect pour mettre à jour le nombre de plats à afficher en fonction de la largeur de la fenêtre
  useEffect(() => {
    const updateScrollAmount = () => {
      if (window.innerWidth >= 1024) {
        setScrollAmount(5);
      } else if (window.innerWidth >= 768) {
        setScrollAmount(4);
      } else {
        setScrollAmount(2);
      }
    };

    window.addEventListener('resize', updateScrollAmount);
    updateScrollAmount();

    return () => window.removeEventListener('resize', updateScrollAmount); // Nettoyage de l'écouteur d'événements lors du démontage
  }, []);

  // Définition d'un état pour stocker l'index du premier plat visible
  const [visibleDishesIndex, setVisibleDishesIndex] = useState(0);

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    setVisibleDishesIndex(
      (prevIndex) => (prevIndex + scrollAmount) % dishes.length
    );
  };

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    setVisibleDishesIndex(
      (prevIndex) => (prevIndex - scrollAmount + dishes.length) % dishes.length
    );
  };

  // Calcul des plats visibles
  const visibleDishes = dishes.slice(
    visibleDishesIndex,
    visibleDishesIndex + scrollAmount
  );

  // Rendu du composant CardList
  return (
    <div className="cardList">
      <img
        src={chevronLeft}
        alt="Previous"
        className="chevron chevron-left"
        onClick={scrollLeft}
      />
      {visibleDishes.map((dish) => (
        <Card
          key={dish.id}
          id={dish.id}
          imageUrl={dish.picture}
          dishName={dish.name}
          rating={dish.rating}
          reviewCount={dish.reviewCount}
          isFavorited={favorites.some((favorite) => favorite.id === dish.id)}
        />
      ))}
      <img
        src={chevronRight}
        alt="Next"
        className="chevron chevron-right"
        onClick={scrollRight}
      />
    </div>
  );
}
export default CardList;
