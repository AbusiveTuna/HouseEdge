//the purpose of this class is to do the following

//It should provide the correct play for the user given the state, and known information.

//For example, if the user has a high pair, we tell the user to let it ride.
//If the user has a low pair, and sees 6 other player cards contain his other cards. We tell him to pull
//etc etc etc.

import { checkFlush, checkMultiples } from './handResults';


const orderValue = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5,
    '4': 4, '3': 3, '2': 2
};

const orderSuit = {
    'clubs': 4, 'diamonds': 3, 'hearts': 2, 'spades': 1
};

function handProbability(hand) {

    //indepth strategy needs to be posted here basically.
    let cardsDealt = hand.length;

    let multiples = checkMultiples(hand);
    if (multiples != "Nothing") {
        return multiples;
    }
    else if (checkFlush(hand)) {
        if (checkRoyalDraw(hand)) {
            return "Royal Flush Draw";
        }
        else if (checkStraightDraw(hand)) {
            return "Straight Flush Draw";
        }
        else {
            return "Flush Draw";
        }
    }
    else if (checkStraightDraw(hand)) {
        return "Straight Draw";
    }
    else {
        return "Pull";
    }

}

function checkRoyalDraw(currentHand) {
    const highCards = ['A', 'K', 'Q', 'J', '10'];
    return currentHand.every(card => highCards.includes(card.value));
}


function checkStraightDraw(currentHand) {
    let handValues = currentHand.map(card => orderValue[card.value]);
    handValues.sort((a, b) => a - b);

    // Check if the range of the hand is less than or equal to 4
    let isStraightDraw = handValues[handValues.length - 1] - handValues[0] <= 4;

    // If not a straight draw and contains an Ace, check for low Ace straight draw
    if (!isStraightDraw && handValues.includes(14)) {
        // Replace Ace value from 14 to 1 and sort the hand values again
        handValues = handValues.map(value => value === 14 ? 1 : value).sort((a, b) => a - b);
        isStraightDraw = handValues[handValues.length - 1] - handValues[0] <= 4;
    }

    return isStraightDraw;
}

export default handProbability;