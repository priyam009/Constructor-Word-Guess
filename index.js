var fs = require("fs");
var inquirer = require("inquirer");
var Word = require("./word");

//Varible to count the guesses left before game is over
var guessLeft = 10;

//Varible to keep account of the letter gussed
var guessedLetter = [];

//Variable to check the count of "_" before and after guessing the letter
var before;
var after;

//Inquirer to get letter from the user as a guess
var askLetter = function(newWord) {
  //10 available chances to guess the word
  if (guessLeft > 0) {
    //Use inquirer to get the user input
    inquirer
      .prompt([
        {
          type: "input",
          name: "guess",
          message: "Guess the letter: ",
          validate: function(value) {
            if (value.length === 1) {
              return true;
            } else {
              return false;
            }
          }
        }
      ])
      .then(function(response) {
        //Check if the user input letter is not a repeat
        if (guessedLetter.indexOf(response.guess) === -1) {

          //Add letter to the gussedLetter array
          guessedLetter.push(response.guess);

          //Count "_" in the word before running the constructor
          before = countChar(newWord.displayWord);

          //Checking the existence of letter in the word
          newWord.takeLetter(response.guess);

          //Show the updated letter
          console.log("\b");
          newWord.showLetter();

          //Count "_" in the word after running the constructor
          after = countChar(newWord.displayWord);

          //Check if the count of "_" before and after running the constructor is same or not
          if (after === before) {
            guessLeft--;
            console.log("\n" + "Incorrect!" + "\n");
          } else {
            console.log("\n" + "Correct!" + "\n");
          }

          //Remaining Guesses
          console.log(guessLeft + " guess remaining \n");

          //Running the function askLetter untill guesses left
          askLetter(newWord);

        } else {
          console.log("\n" + "No repeat letters. Try Again!!" + "\n");
          console.log(guessLeft + " guess remaining \n");
          askLetter(newWord);
        }
      });
  } else {
    console.log("Game Lost!" + "\n" + "No more guesses left :(");
  }
};

//Generate random word
function wordGenerate() {
  fs.readFile("./words.txt", "utf-8", function(err, data) {
    if (err) {
      throw err;
    }

    data = data.split(", ");
    var random = data[Math.floor(Math.random() * data.length)];
    random = random.toLowerCase().split("");

    var newWord = new Word(random);
    console.log("\b");
    newWord.showLetter();
    console.log("\n");

    askLetter(newWord);
  });
}

//Check the count of "_" in the word Array
function countChar(check) {
  var check = check.join("");
  check = check.match(/_/g).length;
  return check;
}

//Generate random word and start the game
wordGenerate();
