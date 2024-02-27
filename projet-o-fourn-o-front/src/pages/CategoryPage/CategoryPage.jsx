import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { removeAccents } from '../../utils/removeAccents';
import CardList from '../../components/Card/CardList';

import './CategoryPage.scss';

function CategoryPage() {
  // Utilisez le hook useState pour gérer l'état local des recettes
  const [recipes, setRecipes] = useState([]);
  // Utilisez le hook useParams pour accéder au nom de la catégorie à partir de l'URL
  const { categoryName } = useParams();

  // Utilisez le hook useEffect pour charger les données lorsque le composant est monté ou lorsque categoryName change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faites une requête à l'API pour obtenir les recettes
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/recipes/view`
        );
        const data = await response.json();

        // Filtrez les recettes pour ne garder que celles qui correspondent à la catégorie actuelle
        const filteredRecipes = data.filter((recipe) =>
          recipe.categories.some(
            (category) =>
              removeAccents(category.name).replace(/\s+/g, '-') === categoryName
          )
        );

        // Mettez à jour l'état des recettes avec les recettes filtrées
        setRecipes(filteredRecipes);
      } catch (error) {
        // Gérer l'erreur ici
      }
    };

    // Appellez la fonction fetchData pour charger les données
    fetchData();
  }, [categoryName]); // Dépendance de useEffect : se déclenche à nouveau lorsque categoryName change

  return (
    <div>
      <h1 className="category-title">Recettes {categoryName}</h1>
      {/* Affichez la liste des recettes filtrées */}
      <CardList key={categoryName} recipes={recipes} />
    </div>
  );
}

export default CategoryPage;
