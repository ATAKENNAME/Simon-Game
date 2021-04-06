var defaultedColor = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var computerColorPicked;
var playerColorPicked;
var level = 0;
var started = false;
// var started = false;

// game starts

$(document).on("keypress", function() {
  if (!started) {
  $("#level-title").text("level " + level);
  console.log("we are at level" + level);
  randomDraw();
  userPlayer();
  started = true;
  }
});

// comparision function

function judge() {
  console.log("judge is checking");
  console.log("user" + JSON.stringify(userSequence));
  console.log("game" + JSON.stringify(gameSequence));
  if (JSON.stringify(userSequence) === JSON.stringify(gameSequence)) {
    console.log("condition is met, passed to next level")
    level++;
    $("#level-title").text("level " + level);
    setTimeout(randomDraw(),8000);
    setTimeout(userPlayer(),5000);
  } else {
    var audio = new Audio("sounds/wrong.mp3").play();
    $("#level-title").text("Game Over,Press A Key to Restart");
    console.log("gameover");
  }
}

// human player reaction

function userPlayer() {
  userSequence =[];
  console.log("user array is empty ")

          $(".btn").on("click",function(event){
                event.stopImmediatePropagation();
                console.log('uerPlayer drew their color');
                console.log(event.target.id);
                userSequence.push(event.target.id);
                console.log("userplayer'seq & it's length", userSequence, userSequence.length);
                makeSound(event.target.id);
                informUser(event.target.id);
                var x = userSequence.length-1;
                console.log("userSequence is now "+x);
                if (event.target.id !=gameSequence[x]){
                  var audio = new Audio("sounds/wrong.mp3").play();
                  $("#level-title").text("Geme Over, Press A Key to Restart");
                  console.log("gameover");
                } else if (userSequence.length === gameSequence.length){
                      judge();
                      console.log("calling judge");
                    }});}

// computer player draw a random number
function randomDraw() {
  console.log('a random color is drew')
  var i = Math.floor(Math.random() * 4);
  computerColorPicked = defaultedColor[i];
  gameSequence.push(computerColorPicked);
  console.log("gamesequence & its length", gameSequence, gameSequence.length);
  informUser(computerColorPicked);
  console.log("informUser"+computerColorPicked);
  makeSound(computerColorPicked);
  console.log("madesound"+computerColorPicked);
  console.log("random draw is done, now call User");}



// sound and visual effects
function informUser(colorPicked) {
  $("#" + colorPicked).fadeOut(100).fadeIn(100);
}

function makeSound(colorPicked) {
  var audio = new Audio("sounds/" + colorPicked + ".mp3").play();
}
