//Import Letter module
var Letter = require("./letter");

var inquirer = require("inquirer");

//Word Constructor
var Word = function(word, displayWord = []) {
  this.word = word.split("");
  this.displayWord = displayWord;

  //Creating letter constructor for each letter in the word
  for (var i = 0; i < this.word.length; i++) {
    this.word[i] = new Letter(this.word[i]);
  }
};

//Word Constructor prototype/method, to display the current state of word- value or "_"
Word.prototype.showLetter = function() {
  for (var i = 0; i < this.word.length; i++) {
    this.displayWord[i] = this.word[i].toString();
  }
  console.log(displayWord.join(" "));
};

//Word Constructor prototype/method, to check the user input with the correct answer
Word.prototype.takeLetter = function(userInput) {
  for (var i = 0; i < this.word.length; i++) {
    this.word[i].guess(userInput);
  }
};

//inquirer to ask for input from the user
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Guess the letter: ",
      validate: function(data) {
        if (data.length === 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
  .then(function(userInput) {
    // console.log("userInput", userInput.name);

    var newWord = new Word("Priyam");
    newWord.showLetter();

    console.log("-------------");
    newWord.takeLetter(userInput.name);
    newWord.showLetter();
  });
