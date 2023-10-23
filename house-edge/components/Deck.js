import React from 'react';
import Card from './Card';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
    const deck = [];
  
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
  
    return deck;
  };
  
  const Deck = ({ deck }) => {
    return (
      <div className="deck">
        {deck.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </div>
    );
  };
  

export default Deck;
