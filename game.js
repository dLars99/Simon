var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = [];  // Reset input pattern from user
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Replay the full sequence for the user
  var i = 0;
  function replay() {
    $("#" + gamePattern[i]).fadeOut(110).fadeIn(110);
    playSound(gamePattern[i]);
    i++;
    if (i < gamePattern.length) {
      setTimeout(replay, 500);
    }
  }
  replay();
}

// Press any key to start
$(document).keydown(function gamestart() {
  if (level == 0) {
    nextSequence();
  }
});

// Play sound for appropriate color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// "Blink" animation for current pressed color
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 'Listen' for the user's answer and respond
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    gameOver();
  } else {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

// Game Over
function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $(document.body).addClass("game-over");
  setTimeout(function() {
    $(document.body).removeClass("game-over");
  }, 200);
  $("#level-title").html("Game Over, Press Any Key to Restart");
  startOver();
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
}
