/* eslint-disable import/order */
import React from 'react';
import hero from '../../assets/img/image-hero.png';
import DesktopHero from '../../assets/img/img-hero.png';
import { Link } from 'react-router-dom';

import './HeroSection.scss';

function HeroSection() {
  return (
    <div
      className="heroSectionComplet"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="textContainer">
        <div className="titreHeroSection">
          Cuisinez malin avec presque rien !
        </div>
        <div className="paragrapheHeroSection">
          Transformez vos ingrédients basiques en plats surprenants. Nous vous
          guidons vers des recettes innovantes et adaptées à ce que je vous avez
          déjà en cuisine.
        </div>
        <button className="buttonHeroSection" type="button">
          <Link to="/registration">Laissez-vous inspirer</Link>
        </button>
      </div>
      <div className="heroImageContainer">
        <img className="heroImage" src={DesktopHero} alt="Hero" />
      </div>
    </div>
  );
}

export default HeroSection;
