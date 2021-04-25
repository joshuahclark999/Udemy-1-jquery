var colors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(()=>{
    if(!started){
        $('#level-title').text('Level ' + level)
        nextSequence();
        started = true;
    }
});

$('.btn').click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animateUserPress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randNum = Math.random()*4;
    randNum = Math.floor(randNum);
    var randomChosenColor = colors[randNum];
    gamePattern.push(randomChosenColor);
    
    var colorSound = new Audio('sounds/'+randomChosenColor+'.mp3');
    colorSound.play();

    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(gamePattern);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('Success');
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(()=>{
                nextSequence(); 
            }, 1000);
        }  
        
    }else{
        var wrongAudio = new Audio('sounds/wrong.mp3');
        wrongAudio.play();
        $('#level-title').text('Game over, press any key to restart.');
        $('body').addClass('game-over');
        setTimeout(()=>{
            $('body').removeClass('game-over');
        },200);
        startOver();
        console.log('wrong');
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name){
    var userColorSound = new Audio('sounds/'+name+'.mp3');
    userColorSound.play();
}

function animateUserPress(currentColor){
    $("."+currentColor).addClass('pressed');
    setTimeout(() => {$('.'+currentColor).removeClass('pressed');}, 50);
}