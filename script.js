// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0; // Loop over the card deck array once
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length); // Select a random index in the deck
    var randomCard = cardDeck[randomIndex]; // Select the card that corresponds to randomIndex
    var currentCard = cardDeck[currentIndex]; // Select the card that corresponds to currentIndex
    cardDeck[currentIndex] = randomCard; // Swap positions of randomCard and currentCard in the deck
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1; // Increment currentIndex
  }
  return cardDeck; // Return the shuffled deck
};

var makeDeck = function () {
  var cardDeck = []; // Initialise an empty deck array
  var suits = ["hearts", "diamonds", "clubs", "spades"]; // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suitIndex = 0; // Loop over the suits array
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex]; // Store the current suit in a variable
    // Loop from 1 to 13 to create all cards for a given suit
    // This is an example of a loop without an array.
    var rankCounter = 1; // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12
    while (rankCounter <= 13) {
      var cardName = rankCounter; // By default, the card name is the same as rankCounter
      var cardRank = rankCounter;
      if (cardName == 1) {
        // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card); // Add the new card to the deck
      rankCounter += 1; // Increment rankCounter to iterate over the next rank
    }
    suitIndex += 1; // Increment the suit index to iterate over the next suit
  }
  return cardDeck; // Return the completed card deck
};

// Declare Game modes
var Start_Game = "game start";
var Draw_Cards = "cards are drawn";
var Hit_Stand = "hit or stand";
var GameMode = Start_Game;
var playerHand = [];
var computerHand = [];
var deck = makeDeck(); //create cards
var shuffledDeck = shuffleCards(deck); //shuffle cards

var BlackJackChecker = function (cardArray) {
  // Loop through player hand to check for blackjack
  var firstCard = cardArray[0];
  var secondCard = cardArray[1];
  var BlackJack = false;

  // Blackjack scenarios
  // First card Ace +  Second card is picture/10
  // Second card Ace +  First card is picture/10
  if (
    (firstCard.name == "ace" && secondCard.rank >= 10) ||
    (secondCard.name == "ace" && firstCard.rank >= 10)
  ) {
    BlackJack = true;
  }
  return BlackJack;
};

var showHand = function (playerHandArray, computerHandArray) {
  var playerMessage = "Player has:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  index = 0;
  var computerMessage = "Computer has:<br>";
  while (index < computerHandArray.length) {
    computerMessage =
      computerMessage +
      "- " +
      computerHandArray[index].name +
      " of " +
      computerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + computerMessage;
};

var sumOfCards = function (cardInHand) {
  var handCardValue = 0;
  var countAce = 0; //count no. of ace
  var cardInHandIndex = 0;
  while (cardInHandIndex < cardInHand.length) {
    var currCard = cardInHand[cardInHandIndex];
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      handCardValue = handCardValue + 10;
    } else if (currCard.name == "ace") {
      handCardValue = handCardValue + 11;
      countAce = countAce + 1;
    } else {
      handCardValue = handCardValue + currCard.rank;
    }
    cardInHandIndex = cardInHandIndex + 1;
  }
  cardInHandIndex = 0;
  while (cardInHandIndex < countAce) {
    if (handCardValue > 21) {
      handCardValue = handCardValue - 10;
    }
    cardInHandIndex = cardInHandIndex + 1;
  }
  return handCardValue;
};

var showTotalValue = function (playerCardValue, computerCardValue) {
  var totalValueMessage =
    "<br>Player total value of cards on hand is " +
    playerCardValue +
    "<br>Computer total value of cards on hand is " +
    computerCardValue;
  return totalValueMessage;
};

var main = function (input) {
  console.log(shuffledDeck);
  if (GameMode == Start_Game) {
    playerHand.push(shuffledDeck.pop()); //deal cards
    computerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    console.log(playerHand);
    console.log(computerHand);

    GameMode = Draw_Cards; //update game mode
    var OutputMessage = `Cards dealt<br>Click submit to calculate cards`;
    return OutputMessage;
  }
  if (GameMode == Draw_Cards) {
    var playerBlackjack = BlackJackChecker(playerHand); //check player blackjack
    var computerBlackjack = BlackJackChecker(computerHand); //check computer blackjack
    if (playerBlackjack == true || computerBlackjack == true) {
      //player/computer has blackjack
      if (playerBlackjack == true && computerBlackjack == true) {
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Its a tie!<br>Both Player and Computer has Blackjack!<br><br>Click Submit to start a new game!"; //both blackjack
      } else if (playerBlackjack == true && computerBlackjack == false) {
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Player Blackjack!<br>Player wins!<br><br>Click Submit to start a new game!"; //player blackjack
      } else {
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Computer Blackjack!<br>Computer wins!<br><br>Click Submit to start a new game!"; //computer blackjack
      }
      GameMode = Start_Game;
      playerHand = [];
      computerHand = [];
      deck = makeDeck(); //create cards
      shuffledDeck = shuffleCards(deck); //shuffle cards
    } else {
      var OutputMessage =
        showHand(playerHand, computerHand) +
        '<br>No one has Blackjack<br>Player to type h to "hit" or s to "stand".<br><br>' +
        "Player card total: " +
        sumOfCards(playerHand) +
        "<br> Computer card total: " +
        sumOfCards(computerHand); //no blackjack
      GameMode = Hit_Stand; // update gameMode
    }
    return OutputMessage;
  }

  var container = document.getElementById("container");
  if (GameMode == Hit_Stand) {
    if (input == "h") {
      //player hits
      playerHand.push(shuffledDeck.pop());
      var playerCardValue = sumOfCards(playerHand);
      var computerCardValue = sumOfCards(computerHand);
      var OutputMessage =
        showHand(playerHand, computerHand) +
        `<br>You drew another card. <br>Please type h to "hit" or s to "stand".<br><br>` +
        "Player card total: " +
        sumOfCards(playerHand) +
        "<br> Computer card total: " +
        sumOfCards(computerHand);
    } else if (input == `s`) {
      //player stands, count total value
      var playerCardValue = sumOfCards(playerHand);
      var computerCardValue = sumOfCards(computerHand);
      while (computerCardValue < 16) {
        //if computer cards <16 hit
        computerHand.push(shuffledDeck.pop());
        computerCardValue = sumOfCards(computerHand);
      }
      if (
        playerCardValue == computerCardValue ||
        (playerCardValue > 21 && computerCardValue > 21)
      ) {
        //tie game
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Its a Tie!" +
          showTotalValue(playerCardValue, computerCardValue) +
          `<br><br>Click Submit to start a new game!`;
      } else if (
        (playerCardValue > computerCardValue && playerCardValue <= 21) ||
        (playerCardValue <= 21 && computerCardValue > 21)
      ) {
        //Player win
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Player Wins!" +
          showTotalValue(playerCardValue, computerCardValue) +
          `<br><br>Click Submit to start a new game!`;
      } else {
        //computer wins
        var OutputMessage =
          showHand(playerHand, computerHand) +
          "<br>Computer wins!" +
          showTotalValue(playerCardValue, computerCardValue) +
          `<br><br>Click Submit to start a new game!`;
      }
      GameMode = Start_Game;
      playerHand = [];
      computerHand = [];
      deck = makeDeck(); //create cards
      shuffledDeck = shuffleCards(deck); //shuffle cards
    } else {
      var OutputMessage =
        'Wrong input<br> Please only enter h to "hit" or s to "stand".<br><br>' +
        showHand(playerHand, computerHand);
    }
  }
  return OutputMessage;
};
