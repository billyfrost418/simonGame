var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
// for Game pattern
var gamePattern = [];
// for Users'Pattern
var userClickedPattern = [];

// click event
$(".btn").click(function() {
  // handler function
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// keyboard event to start the game
$(document).keydown(function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// button for start game
$(".start-btn").click(function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



// check answer every time clicking buttons
function checkAnswer(currentLevel) {
  // answer is right
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // check until the last element in the array
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // wrong answer
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Your score is: "+ level +"\nPress Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // start the game again
  }
}


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// restore to initial state
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
