// Dependencies
var readline = require("readline");
const chalk = require("chalk");
const Calculator = require("../lib/calculator");

var cli = {};
const calculator = new Calculator();

// Init function
cli.init = function () {
  // Send the start message to the console in magenta
  console.log(chalk.magenta("The CLI is running"));

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
  });

  var arrayOfInputs = [];
  var k = 0;
  cli.getUserInput = function () {
    _interface.question("Enter numbers and operator of +,-,*,\\\ for RPN or exit terminal to clear \n ----------->    ", function (str) {
      k++;
        const multiInput = str.split("");
        multiInput.forEach(function (val, index, array){
          if(val != ' ') {
            arrayOfInputs.push(val)
          }
        })
        
      console.log("current calculation:", ...arrayOfInputs);

      processCommandlineArgs(calculator);
      console.log("result: " + processCommandlineArgs(calculator));
      cli.getUserInput();

      function processCommandlineArgs(calculator) {
        var result = 0;

        arrayOfInputs.forEach(function (val, index, array) {
          if (isNaN(val)) {
            result = calculator.perform(val);
          } else {
            result = calculator.enter(parseFloat(val, 10));
          }
        });
        return result.toFixed(1);
      }
    });
  };

  cli.getUserInput();
};

cli.init();