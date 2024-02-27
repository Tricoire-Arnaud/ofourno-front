import React from 'react';
// Importation des composants nécessaires
import HeroSection from '../../components/Herosection/HeroSection';
import Sign from '../../components/Sign/Sign';
import CardList from '../../components/Card/CardList';

// Définition du composant HomePage
function HomePage() {
  return (
    <div>
      <HeroSection /> {/* Affichage de la section héro */}
      <Sign text="Les petites dernières" />{' '}
      {/* Affichage du signe avec le texte "Les petites dernières" */}
      <CardList /> {/* Affichage de la liste de cartes */}
      <Sign text="Vous les adorez" />{' '}
      {/* Affichage du signe avec le texte "Vous les adorez" */}
      <CardList /> {/* Affichage de la liste de cartes */}
      <Sign text="Nos recettes de saison" />{' '}
      {/* Affichage du signe avec le texte "Nos recettes de saison" */}
      <CardList /> {/* Affichage de la liste de cartes */}
    </div>
  );
}

// Exportation du composant HomePage
export default HomePage;
