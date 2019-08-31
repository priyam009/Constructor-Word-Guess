//Import Letter module
var Letter = require("./letter");

//Word Constructor
var Word = function(word, displayWord = []) {
  this.word = word;
  this.displayWord = displayWord;

  //Creating letter constructor for each letter in the word
  for (var i = 0; i < this.word.length; i++) {
    this.word[i] = new Letter(this.word[i]);
    // console.log(this.word[i]);
  }
};

//Word Constructor prototype/method, to display the current state of word- value or "_"
Word.prototype.showLetter = function() {
  for (var i = 0; i < this.word.length; i++) {
    this.displayWord[i] = this.word[i].toString();
  }
  console.log(this.displayWord.join(" "));
};

//Word Constructor prototype/method, to check the user input with the correct answer
Word.prototype.takeLetter = function(userInput) {
  for (var i = 0; i < this.word.length; i++) {
    this.word[i].guess(userInput);
    // console.log(this.word[i]);
  }
};

module.exports = Word;
