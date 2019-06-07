var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var score = 0;
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
      score++;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // wrong answer
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    $(".below-title").text("Oops!");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
      $("#level-title").text("Press Any Key to Restart");
      $(".below-title").text("Let's try again");
    }, 1200);


    startOver(); // start the game again
  }
}

function nextSequence() {
  level++;
  encourage(score);
  $("#level-title").text("Score " + score);
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
  score = 0;
  gamePattern = [];
  started = false;
}

// add animation
function encourage(score) {
  switch (score) {
    case 0:
      $(".below-title").text("Tab the blinking button!");
      break;
    case 1:
      $(".below-title").text("Well done");
      break;
    case 2:
      $(".below-title").text("You're doing great!");
      break;
    case 3:
      $(".below-title").text("Excellent!");
      break;
    case 4:
      $(".below-title").text("Unbelievable!");
      break;
    case 5:
      $(".below-title").text("Your memory is a treasure!");
      break;
    case 6:
      $(".below-title").text("Keep playing");
      break;
    case 7:
      $(".below-title").text("Nothing can stop you");
      break;
    case 8:
      $(".below-title").text("❤");
      break;
    case 9:
      $(".below-title").text("❤❤❤");
      break;
    case 10:
      $(".below-title").text("You own my heart!");
      break;
    default: $(".below-title").text("😁");

  }
}
