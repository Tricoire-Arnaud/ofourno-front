/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Action asynchrone pour charger et filtrer les recettes
export const fetchAndFilterRecipes = createAsyncThunk(
  'recipes/fetchAndFilter',
  async (searchTerms, { rejectWithValue }) => {
    try {
      // Appel à l'API pour obtenir les recettes
      const response = await api.get('/recipes/view');
      const recipes = response.data;

      // Filtre les recettes basées sur les termes de recherche
      const filteredRecipes = recipes.filter((recipe) =>
        searchTerms.every((term) =>
          recipe.ingredients.some((ingredient) =>
            // Accéder à la propriété `name` de chaque `ingredient` pour la comparaison
            ingredient.name.toLowerCase().includes(term.toLowerCase())
          )
        )
      );

      // Retourne les recettes filtrées
      return filteredRecipes;
    } catch (error) {
      // En cas d'erreur, rejette la promesse avec l'erreur
      return rejectWithValue(error.toString());
    }
  }
);

// Création d'un slice Redux pour la gestion des recettes
export const recipesSlice = createSlice({
  name: 'recipes', // Nom du slice
  initialState: {
    items: [], // Liste initiale des recettes
    isLoading: false, // Indicateur de chargement
    error: null, // Erreur initiale
  },
  reducers: {
    // Reducer pour effacer les résultats des recettes
    clearRecipesResults: (state) => {
      state.items = []; // Réinitialise les recettes
      state.isLoading = false; // Réinitialise l'indicateur de chargement
      state.error = null; // Réinitialise l'erreur
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndFilterRecipes.pending, (state) => {
        // Lorsque la requête est en cours, met à jour l'indicateur de chargement
        state.isLoading = true;
      })
      .addCase(fetchAndFilterRecipes.fulfilled, (state, action) => {
        // Lorsque la requête est réussie, met à jour les recettes et réinitialise l'indicateur de chargement
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAndFilterRecipes.rejected, (state, action) => {
        // Lorsque la requête échoue, met à jour l'erreur et réinitialise l'indicateur de chargement
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Exportation des actions du slice
export const { clearRecipesResults } = recipesSlice.actions;

// Exportation du reducer du slice
export default recipesSlice.reducer;
