// pages/LetItRide.js
import React, { useEffect, useState } from 'react';
import Deck, { createDeck } from '../../components/Deck';
import shuffle from '../../utils/shuffle';

export default function LetItRide() {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [gameState, setGameState] = useState('START');

  // Shuffle and set the deck when the component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  // Start the game once the deck is set
  useEffect(() => {
    if (deck.length > 0) {
      startGame();
    }
  }, [deck]);

  // Handle game state changes
  useEffect(() => {
    handleGameStateChange();
  }, [gameState]);

  const initializeGame = () => {
    const newDeck = shuffle(createDeck());
    setDeck(newDeck);
  };

  const startGame = () => {
    setHand(deck.slice(0, 3));
    setCommunityCards(deck.slice(3, 5));
    setGameState('FIRST_CHOICE');
  };

  const handleGameStateChange = () => {
    if (gameState === 'FIRST_CHOICE') {
      // Wait for player to make a choice
    } else if (gameState === 'SECOND_CHOICE') {
      // Wait for player to make a choice
    } else if (gameState === 'END') {
      // Game over, calculate result
    }
  };

  const handleChoice = (choice) => {
    if (gameState === 'FIRST_CHOICE') {
      // Handle first choice
      setGameState('SECOND_CHOICE');
    } else if (gameState === 'SECOND_CHOICE') {
      // Handle second choice
      console.log(hand);
      setGameState('END');
    }
  };

  return (
    <div>
      <h1>Let It Ride</h1>
      <h2>Your Hand</h2>
      <Deck deck={hand} />
      <h2>Community Cards</h2>
      <Deck deck={communityCards} />
      {(gameState === 'FIRST_CHOICE' || gameState === 'SECOND_CHOICE') && (
        <div>
          <button onClick={() => handleChoice('PULL')}>Pull</button>
          <button onClick={() => handleChoice('LET_IT_RIDE')}>Let It Ride</button>
        </div>
      )}
    </div>
  );
}
