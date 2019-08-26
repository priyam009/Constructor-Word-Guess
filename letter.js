//Letter Constructor to take single character value
var Letter = function(value) {
  this.value = value;
  this.isGuessed = false;
};

//Constructor method to print the correct value or "_"
Letter.prototype.toString = function() {
  if (!this.isGuessed) {
    return "_";
  } else {
    return this.value;
  }
};

//Constructor methos to check the user input with the correct answer
Letter.prototype.guess = function(letter) {
  if (letter === this.value) {
    this.isGuessed = true;
  }
};

//Export Letter module
module.exports = Letter;
