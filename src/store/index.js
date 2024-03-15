/* eslint-disable import/prefer-default-export */
// Importation de la fonction configureStore de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importation des reducers
import favoritesReducer from '../features/favoritesSlice';
import authReducer from '../features/authSlice';
import recipesReducer from '../features/recipesSlice';
import searchReducer from '../reducers/searchReducer';

// Configuration du store Redux
const store = configureStore({
  reducer: {
    // Mapping des autres reducers à leurs clés respectives
    favorites: favoritesReducer,
    auth: authReducer,
    search: searchReducer,
    recipes: recipesReducer,
  },
});

// Exportation du store
export default store;
