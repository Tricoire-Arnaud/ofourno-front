/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Tentez de charger l'état initial à partir de localStorage ou définissez-le à un tableau vide
const initialState = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : [];

// Création d'un slice Redux pour la gestion des favoris
const favoritesSlice = createSlice({
  name: 'favorites', // Nom du slice
  initialState, // État initial
  reducers: {
    // Reducer pour l'ajout d'un favori
    addFavorite: (state, action) => {
      state.push(action.payload); // Ajout du favori à l'état
      // Mettre à jour localStorage après chaque ajout
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    // Reducer pour la suppression d'un favori
    removeFavorite: (state, action) => {
      const index = state.findIndex(
        (favorite) => favorite.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1); // Suppression du favori de l'état
        // Mettre à jour localStorage après chaque suppression
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    // Reducer pour la restauration des favoris
    restoreFavorites: (state, action) => {
      return [...action.payload]; // Restauration de l'état à partir de la payload de l'action
    },
  },
});

// Exportation des actions du slice
export const { addFavorite, removeFavorite, restoreFavorites } =
  favoritesSlice.actions;

// Exportation du reducer du slice
export default favoritesSlice.reducer;
