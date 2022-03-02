const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numGuessed = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = word => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = letter => {

  //for each element with class letter, assign the innerHTML of that element to letter
  for (const div of document.querySelectorAll(`.${letter}`)) {
    div.innerHTML = letter;
    numGuessed += 1;

    // if (numGuessed === word.length) {
    //   document.querySelector("#win").style.display = "";
    // }
  }
};


// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  
    // if game has been lost
    if (numWrong === 5) {

        //disable all buttons in the document

        for (const button of document.querySelectorAll('.button')) {
          disableLetterButton(button);
        }

        //display hidden element

        document.querySelector("#play-again").style.display = "";

    } else {

      //increment numWrong
      numWrong += 1

      //update image
      document.querySelector("#shark-img").setAttribute('src', `/static/images/guess${numWrong}.png`)

    }

};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll("button")) {
    // add an event handler to handle clicking on a letter button
    // YOUR CODE HERE

    button.addEventListener('click', () => {
      const letter = button.innerHTML; //retrieve the letter being guessed
      
      disableLetterButton(button); //disable the button that was just clicked

      //if correct guess
      if (isLetterInWord(letter)) {

        handleCorrectGuess(letter); //handleCorrectGuess fct on letter

        if (numGuessed === word.length) {
          document.querySelector("#win").style.display = "";
        }

      } else { //otherwise

        handleWrongGuess(letter); //handleWrongGuess fct on letter
        
      }

    });

  }

  // add an event handler to handle clicking on the Play Again button

  document.querySelector("#play-again").addEventListener("click", resetGame)
})();

