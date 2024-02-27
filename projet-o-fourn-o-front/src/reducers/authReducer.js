/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Création d'une tranche de l'état global pour l'authentification
const authSlice = createSlice({
  name: 'auth', // Nom de la tranche
  initialState: { status: 'pending', error: null, token: null, pseudo: null }, // État initial
  reducers: {
    // Reducteur pour le succès de la connexion
    loginSuccess: (state, action) => {
      state.status = 'succeeded'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = action.payload; // Mise à jour du token
      state.pseudo = action.payload.pseudo; // Mise à jour du pseudo
    },
    // Reducteur pour l'échec de la connexion
    loginFailed: (state, action) => {
      state.status = 'failed'; // Mise à jour du statut
      state.error = action.payload; // Mise à jour de l'erreur
      state.token = null; // Réinitialisation du token
    },
    // Reducteur pour la déconnexion
    logout: (state) => {
      state.status = 'pending'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = null; // Réinitialisation du token
      state.pseudo = null; // Réinitialisation du pseudo
    },
    // Reducteur pour la restauration de la session
    restoreSession: (state, action) => {
      state.status = 'succeeded'; // Mise à jour du statut
      state.error = null; // Réinitialisation de l'erreur
      state.token = action.payload; // Mise à jour du token
    },
  },
});

// Exportation des actions
export const { loginSuccess, loginFailed, logout, restoreSession } =
  authSlice.actions;

// Exportation du reducer
export default authSlice.reducer;
