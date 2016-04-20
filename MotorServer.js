var five = require("johnny-five");
var board = new five.Board();
var express = require('express');
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(express.static('public'));


board.on("ready", function() {

 // Motor stuff 

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

 // Server stuff 

  app.listen(app.get('port'));
  app.get("/", function(req, res, next){
    res.render('index');
  });

  app.get("/forward", function(req, res, next){
    moveForward();
    res.json({status: 'done'});
  });

  app.get("/back", function(req, res, next){
    moveBackwards();
    res.json({status: 'done'});
  });

  app.get("/right", function(req, res, next){
    right();
    res.json({status: 'done'});
  });

  app.get("/left", function(req, res, next){
    left();
    res.json({status: 'done'});
  });

   app.get('/stop',function(req, res, next){
    brake();
    res.json({status: 'done'});
  })


  var led = new five.Led(8);
  led.blink(500);
  brake();

  this.repl.inject({
    led: led,
    forward: moveForward,
    back: moveBackwards,
    brake: brake,
    right: right,
    left: left
  });
});
