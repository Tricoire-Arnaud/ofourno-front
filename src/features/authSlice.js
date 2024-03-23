/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Création d'un slice Redux pour la gestion de l'authentification
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState: { status: 'pending', error: null, token: null, pseudo: null }, // État initial
  reducers: {
    // Reducer pour le succès de la connexion
    loginSuccess: (state, action) => {
      state.status = 'succeeded'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = action.payload.token; // Stockage du token
      state.pseudo = action.payload.pseudo; // Stockage du pseudo
    },
    // Reducer pour l'échec de la connexion
    loginFailed: (state, action) => {
      state.status = 'failed'; // Mise à jour du statut
      state.error = action.payload; // Stockage de l'erreur
      state.token = null; // Réinitialisation du token
    },
    // Reducer pour la déconnexion
    logout: (state) => {
      state.status = 'pending'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = null; // Réinitialisation du token
      state.pseudo = null; // Réinitialisation du pseudo
    },
    // Reducer pour la restauration de la session
    restoreSession: (state, action) => {
      state.status = 'succeeded'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = action.payload; // Stockage du token
    },
    // Reducer pour la suppression du compte
    deleteAccount: (state) => {
      state.status = 'pending';
      state.error = null;
      state.token = null;
    },
  },
});

// Exportation des actions du slice
export const { loginSuccess, loginFailed, logout, restoreSession } =
  authSlice.actions;

// Exportation du reducer du slice
export default authSlice.reducer;
