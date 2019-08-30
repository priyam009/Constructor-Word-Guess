var fs = require('fs');
var inquirer = require('inquirer');

var count = 10;


function askLetter() {
  inquirer.prompt([
    {
      type: "input",
      name: "letterGuess",
      message: "Guess the letter: ",
      validate: function(value) {
        if(value.length === 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
  .then(function(response) {
    console.log(response.letterGuess);
  })
}

function wordGenerate() {
  fs.readFile('./words.txt', 'utf-8', function(err, data) {
    if(err) {
      throw err;
    }
  
    data = data.split(", ");
    var random = data[Math.floor(Math.random() * data.length)];
    console.log(random);

  });
}
