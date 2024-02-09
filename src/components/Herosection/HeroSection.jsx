import React from 'react';
import hero from '../../assets/image-hero.png';

import './HeroSection.scss';

function HeroSection() {
  return (
    <div
      className="HeroSectionComplet"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="TitreHeroSection">
        Cuisiniez malin avec presque rien !
      </div>
      <div className="ParagrapheHeroSection">
        Transformez vos ingrédients basiques en plats surprenants. Nous vous
        guidons vers des recettes innovantes et adaptées à ce que je vous avez
        déjà en cuisine.
      </div>
      <div className="ButtonHeroSection">
        <div className="TextButton">Lorem ipsum</div>
      </div>
    </div>
  );
}

export default HeroSection;
