// Désactivation de la règle ESLint qui préfère les exports par défaut
// Fonction pour supprimer les accents d'une chaîne de caractères
// eslint-disable-next-line import/prefer-default-export
export function removeAccents(str) {
  // La méthode normalize('NFD') décompose les caractères accentués en leur forme de base et un caractère d'accent séparé
  // La méthode replace(/[\u0300-\u036f]/g, '') supprime tous les caractères d'accent
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
