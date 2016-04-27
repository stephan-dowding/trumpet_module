var numbers = require('./numbers')
var mraa = require('mraa');

numbers.displayDot();

var button = new mraa.Gpio(2); //setup digital read on Digital pin #6 (D6)
button.dir(mraa.DIR_IN);

currentDigit = 0;
var buttonInterval = setInterval(readButton, 100);
var countInterval;
var butCount = 0;

function readButton()
{
  var buttonState = button.read()
  console.log('Button is: ' + buttonState);
  butCount = buttonState ? butCount + 1 : 0;
  if (butCount >= 3) {
    clearInterval(buttonInterval);
    countInterval = setInterval(countUp, 1000);
  }
}

function countUp()
{
  if (!button.read())
  {
    clearInterval(countInterval);
    numbers.displayClear();
    console.log('Button Released on: ' + currentDigit);
  }
  else
  {
    currentDigit = (currentDigit+1)%10
    console.log(currentDigit);
    numbers['display' + currentDigit]();
  }
}