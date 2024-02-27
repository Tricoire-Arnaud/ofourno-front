// Importation de createSlice depuis @reduxjs/toolkit pour créer un slice Redux
import { createSlice } from '@reduxjs/toolkit';

// Tentez de charger l'état initial à partir de localStorage ou définissez-le à un tableau vide
const initialState = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : [];

// Création d'un slice Redux pour les favoris
const favoritesSlice = createSlice({
  // Nom du slice
  name: 'favorites',
  // État initial
  initialState,
  // Réducteurs
  reducers: {
    // Réducteur pour ajouter un favori
    addFavorite: (state, action) => {
      // Ajouter le favori à l'état
      state.push(action.payload);
      // Sauvegarder l'état mis à jour dans localStorage
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    // Réducteur pour supprimer un favori
    removeFavorite: (state, action) => {
      // Supprimer le favori de l'état
      return state.filter((favorite) => favorite.id !== action.payload.id);
      // Mise à jour de localStorage dans le réducteur n'est pas nécessaire ici, car le state est déjà filtré
    },
    // Réducteur pour restaurer les favoris
    restoreFavorites: (state, action) => {
      // Restaurer l'état à partir du payload si nécessaire
      return action.payload;
    },
  },
});

// Exportation des actions
export const { addFavorite, removeFavorite, restoreFavorites } =
  favoritesSlice.actions;

// Exportation du réducteur
export default favoritesSlice.reducer;
