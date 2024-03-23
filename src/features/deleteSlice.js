import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';
import api from '../api';

export const deleteAccountAsync = createAsyncThunk(  'auth/deleteAccount',
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const dispatch = useDispatch(); // Utilisation du hook useDispatch pour dispatcher des actions Redux
      const response = await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logout()); // Déconnexion après suppression du compte
      localStorage.removeItem('token'); // Suppression du token du localStorage
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
