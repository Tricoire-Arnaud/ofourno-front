/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Création d'un slice Redux pour la gestion des informations de l'utilisateur
export const userSlice = createSlice({
  name: 'user', // Nom du slice
  initialState: {
    userInfo: {}, // Informations initiales de l'utilisateur
    error: null, // Erreur initiale
    // Ajoutez d'autres états initiaux au besoin
  },
  reducers: {
    // Reducer pour la mise à jour réussie des informations de l'utilisateur
    updateSuccess: (state, action) => {
      // Fusionne les informations actuelles de l'utilisateur avec les nouvelles informations
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    // Reducer pour l'échec de la mise à jour des informations de l'utilisateur
    updateFailed: (state, action) => {
      // Stocke l'erreur
      state.error = action.payload;
    },
    // Vous pouvez ajouter d'autres reducers au besoin
  },
});

// Exportation des actions du slice
export const { updateSuccess, updateFailed } = userSlice.actions;

// Exportation du reducer du slice
export default userSlice.reducer;
