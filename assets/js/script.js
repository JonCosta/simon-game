$(function () {

    var colors = ["green", "blue", "yellow", "red"];
    var colorSounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    };
    var targetSequence = [];
    var playerSequence = [];

    function startGame() {
        console.log("Game started");
        targetSequence = [];
        playerSequence = [];
        addToSequence();
        presentSequence();
    }

    function addToSequence() {
        let randomIndex = Math.floor(Math.random() * 4);
        targetSequence.push(colors[randomIndex]);
        console.log(targetSequence);
    }

    function presentSequence() {
        console.log("Presenting steps");
        for (let i = 0; i < targetSequence.length; i++) {
            const step = targetSequence[i];
            console.log("Step", step);
            colorSounds[step].play();
            setTimeout(() => {
                colorSounds[step].pause();
                colorSounds[step].currentTime = 0;
            }, 600);
            sleep(700);
        }
    }

    function checkSequences() {
        console.log("Checking sequences");
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] != targetSequence[i]) {
                console.log("Wrong!");
                sleep(1000);
                return false;
                presentSequence();
                playerSequence = [];
            }
        }

        console.log("Correct!");
        if (playerSequence.length == 20) {
            // WINNER
            return false;
        }

        if (playerSequence.length == targetSequence.length) {
            addToSequence();
            presentSequence();
            playerSequence = [];
        }
    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    $(".btn-start").click(function (e) {
        e.preventDefault();
        startGame();
    });

    $('.circle-quarter').click(function (e) {
        e.preventDefault();
        let color = $(this).data('color');
        playerSequence.push(color);
        colorSounds[color].play();
        setTimeout(() => {
            colorSounds[color].pause();
            colorSounds[color].currentTime = 0;
        }, 600);
        checkSequences();
    });

});