const orderValue = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5,
    '4': 4, '3': 3, '2': 2
  };
  
const orderSuit = {
    'clubs': 4, 'diamonds': 3, 'hearts': 2, 'spades': 1
};


function calculateResult(playerHand,communityCards) {
    let finalHand = playerHand;

    if(communityCards != null){
        for (let index in communityCards){
            finalHand.push(communityCards[index]);
        }
    }

    finalHand.sort((a, b) => {
        if(orderValue[a.value] === orderValue[b.value]) {
            return orderSuit[a.suit] - orderSuit[b.suit];
        } else {
            return orderValue[b.value] - orderValue[a.value];
        }
    });

    //if its a flush we have three possible outcomes.
    //Royal Flush, Straight Flush, Flush.
    if(checkFlush(finalHand)){
        if(checkStraight(finalHand)){
            //either royal or straight flush
            if(finalHand[0].value == "A"){
                return "RoyalFlush";
            }
            return "StraightFlush";
        }
        else{
            return "Flush";
        }
    }
    //if its not a flush but it is a straight, it can only be a straight.
    else if(checkStraight(finalHand)){
        return "Straight";
    }
    else{
        return checkMultiples(finalHand);
    }
}
  

function checkFlush(hand){
    let suit = hand[0].suit;
    for(let index in hand){
        if(suit != hand[index].suit){
            return false;
        }
    }
    return true;
}

function checkStraight(hand){
  let values = hand.map(card => orderValue[card.value]);
  values.sort((a, b) => b - a);

  // Check if values are sequential
  for(let i = 0; i < values.length - 1; i++) {
      if(values[i] - values[i + 1] !== 1) {
          // Special case: Ace can also be a "1"
          if(!(values[i] === 14 && values[i + 1] === 2)) {
              // If initial check fails, check for A,2,3,4,5 straight
              if(values.includes(14)) {
                  values[values.indexOf(14)] = 1; // Replace Ace value from 14 to 1
                  values.sort((a, b) => b - a); // Sort the array again
                  for(let i = 0; i < values.length - 1; i++) {
                      if(values[i] - values[i + 1] !== 1) {
                          return false;
                      }
                  }
                  return true;
              }
              return false;
          }
      }
  }

  return true;
}


function checkMultiples(hand) {
  let counts = {};

  // Count the occurrences of each value
  for(let i = 0; i < hand.length; i++) {
      let value = hand[i].value;
      if(counts[value]) {
          counts[value]++;
      } else {
          counts[value] = 1;
      }
  }

  // Find the highest count
  let maxCount = 1;
  let maxCountValue = null;
  for(let value in counts) {
      if(counts[value] > maxCount) {
          maxCount = counts[value];
          maxCountValue = value;
      }
  }

  // Remove cards that made up the maxCount
  if(maxCount >= 2 && maxCount <= 3) {
      let newHand = hand.filter(card => card.value != maxCountValue);
      let result = checkMultiples(newHand);
      
      if(result == "pair" && maxCount == 3){
          return "full house";
      } else if(result == "pair" && maxCount == 2){
          return "2 pair";
      } else if(maxCount == 3){
          return "3 of a kind";
      } else if(maxCount == 2){
          return "pair";
      }
  }

  if(maxCount == 4){
      return "four of a kind";
  }

  return "nothing"
}


export { calculateResult, checkFlush, checkMultiples };