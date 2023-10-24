import React, { useState } from 'react';

function Card ({ suit, value }) {
  const cardImage = `/cards/${value}${suit}.png`;

  return (
    <div className="card">
      <img src={cardImage} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
