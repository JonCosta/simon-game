$(function () {

    var targetSequence = [];
    var targetSequenceCopy = [];
    var playerSequence = [];
    var audioPlayer;
    var soundPlaying;
    var stepCount = 0;
    var strictMode = false;
    var isGameOn = false;
    var isGameRunning = false;
    var flashInterval;
    var flashCounter = 0;

    function resetVariables() {
        targetSequence = [];
        playerSequence = [];
        stepCount = 0;
        strictMode = false;
        isGameOn = false;
        isGameRunning = false;
        $('.counter').val('--');
        $('.strict').css('background-color', '#000');
    }

    var colors = ["green", "blue", "yellow", "red"];
    var colorSounds = {
        green: document.getElementById('soundGreen'),
        blue: document.getElementById('soundBlue'),
        yellow: document.getElementById('soundYellow'),
        red: document.getElementById('soundRed')
    };

    $(".btn-start").click(function (e) {
        e.preventDefault();
        startNewGame();
    });

    $('.circle-quarter').click(function (e) {
        e.preventDefault();
        if (!isGameOn || !isGameRunning) return false;        
        let color = $(this).data('color');
        playSoundFromButton(color);
        playerSequence.push(color);
        checkSequences();
    });

    $('.btn-strict').click(function (e) { 
        e.preventDefault();
        if (!isGameOn) return false;
        strictMode = !strictMode;
        let displayColor = strictMode ? '#edb100' : '#000' ;
        $('.strict').css('background-color', displayColor);
    });

    $('.btn-on-off').click(function (e) { 
        e.preventDefault();
        isGameOn = !isGameOn;
        if (!isGameOn) {
            resetVariables();
        }
        let displayColor = isGameOn ? '#edb100' : '#000' ;
        $('.on-off').css('background-color', displayColor);
    });

    function playSoundFromArray() {
        if (!isGameOn) return false;
        if (targetSequenceCopy.length) {

            var currentColor = targetSequenceCopy.shift();
            audioPlayer = colorSounds[currentColor];
    
            audioPlayer.addEventListener("ended", function() {
                $(`[data-color="${currentColor}"]`).css('opacity', '0.6');
            });

            $(`[data-color="${currentColor}"]`).css('opacity', '1');
            audioPlayer.play();
            
        } else {
            clearInterval(soundPlaying);
            isGameRunning = true;
        }
    }
    
    function playSoundFromButton(buttonColor) {
        $(`[data-color="${buttonColor}"]`).css('opacity', '1');
        colorSounds[buttonColor].play();
        setTimeout(() => {
            $(`[data-color="${buttonColor}"]`).css('opacity', '0.6');
        }, 130);
    }
    
    function startSoundSequence() {
        isGameRunning = false;
        targetSequenceCopy = targetSequence.slice(0);
        soundPlaying = setInterval(function() {
            playSoundFromArray();
        }, 600);
    }

    function startNewGame() {
        if (!isGameOn) return false;
        isGameRunning = true;
        
        targetSequence = [];
        playerSequence = [];
        addStepToSequence();
        stepCount = 1;
        setCounterNumber(stepCount);
        startSoundSequence();
    }

    function addStepToSequence() {
        let randomIndex = Math.floor(Math.random() * 4);
        targetSequence.push(colors[randomIndex]);
    }

    function checkSequences() {
        if (!isGameOn) return false;
        // console.log("Checking sequences", playerSequence, targetSequence);
        isGameRunning = false;
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] != targetSequence[i]) {
                console.log("Wrong!");
                returnWrongResult();
                return false;
            }
        }
        
        if (playerSequence.length == targetSequence.length) {
            if (stepCount === 20) {
                flashMessage('WIN!');
                setTimeout(() => {
                    startNewGame();
                }, 4100);
                return false;
            }
            stepCount++;
            setCounterNumber(stepCount);
            addStepToSequence();
            playerSequence = [];
            setTimeout(() => {
                startSoundSequence();
            }, 700);
        } else {
            isGameRunning = true;
        }
    }

    function returnWrongResult() {
        playerSequence = [];

        // Show the error message on the Counter display
        // $('.counter').val('!!');
        flashMessage('!!');

        setTimeout(() => {
            if (strictMode) {
                startNewGame();
            } else {
                setCounterNumber(stepCount);
                startSoundSequence();
            }
        }, 4100);
    }

    function setCounterNumber(number) {
        if (number < 10) {
            number = '0'+number;
        }
        $('.counter').val(number);
    }

    function flashMessage(message) {
        
        flashInterval = setInterval(function() {
            let currentMessage = $('.counter').val();
            $('.counter').val(currentMessage ? '' : message);
            if (flashCounter > 5) {
                clearInterval(flashInterval);
                flashCounter = 0;
            } else {
                flashCounter++;
            }
        }, 500);
    }

});