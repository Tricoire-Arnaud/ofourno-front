import React from 'react';
import SignImage from '../../assets/Sign.png';

import './Sign.scss';

function Sign() {
  return (
    <div className="SectionSign">
      <div className="SignComplete">
        <img className="Sign" src={SignImage} alt="Sign" />
        <div className="TextSign">Les petites dernières</div>
      </div>
    </div>
  );
}

export default Sign;
