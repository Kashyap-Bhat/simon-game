var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var usersPattern = [];
var started = false;
var level = 0;

function newSequence(){
    var randomNum = Math.floor(Math.random()*4);
    var chosenColor = buttonColors[randomNum];
    gamePattern.push(chosenColor);
    playSound(chosenColor);
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
    level++;
    updateHeader();
    
}

$(".btn").click(function(){
    if(!started){
        wrongAnswer();
        return;
    }

    var userChosenColour = this.id;
    usersPattern.push(userChosenColour);

    checkAnswer(usersPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);

})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function updateHeader(){
    $("#level-title").text("Level "+level);
}

function wrongAnswer(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    usersPattern = [];
    started = false;
}

function correctAnswer(){
    if(usersPattern.length === gamePattern.length){
            usersPattern = [];
            setTimeout(function(){
                newSequence();
            },1000)
        }
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === usersPattern[currentLevel]){
        correctAnswer();
    }else wrongAnswer();
}

$(document).keydown(function(){
    if(started)return;
    started = true;
    newSequence();

})
