// Importation de la bibliothèque axios
import axios from 'axios';

// Création d'une instance d'axios avec une URL de base spécifiée
const api = axios.create({
  // L'URL de base est récupérée à partir des variables d'environnement
  // import.meta.env.VITE_API_BASE_URL est une variable d'environnement spécifiée dans un fichier .env
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Exportation de l'instance d'axios pour être utilisée dans d'autres parties de l'application
export default api;
