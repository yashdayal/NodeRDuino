var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  //var motor = new five.Motor({pins: [2,3]});
  var leftMotorPin1 = new five.Pin(2);
  var leftMotorPin2 = new five.Pin( {pin:3,  type: "digital"});
  
  var rightMotorPin1 = new five.Pin( {pin:5,  type: "digital"});
  var rightMotorPin2 = new five.Pin( {pin:6,  type: "digital"});


  function moveBackwards(){
    leftMotorPin1.low();leftMotorPin2.high();
    rightMotorPin1.low();rightMotorPin2.high();
  }

  function moveForward(){
    leftMotorPin1.high();leftMotorPin2.low();
    rightMotorPin1.high();rightMotorPin2.low();
  }

  function left(){
    leftMotorPin1.high();leftMotorPin2.low();
    rightMotorPin1.high();rightMotorPin2.high();
  }

  function right(){
    leftMotorPin1.high();leftMotorPin2.high();
    rightMotorPin1.high();rightMotorPin2.low();
  }

  function brake(){
    leftMotorPin1.high();leftMotorPin2.high();
    rightMotorPin1.high();rightMotorPin2.high();
  }

  var led = new five.Led(8);
  led.blink(500);
  brake();

  this.repl.inject({
    led: led,
    forward: moveForward,
    back: moveBackwards,
    brake: brake,
    right: right,
    left, left
  });
});
