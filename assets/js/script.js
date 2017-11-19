$(function () {

    var Simon = {
        colors: ["green", "blue", "yellow", "red"],
        colorSounds: {
            green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
            blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
            yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
            red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
        },
        targetSequence: [],
        playerSequence: [],

        startGame: function () {
            console.log("Game started");
            this.targetSequence = [];
            this.playerSequence = [];
            this.addToSequence();
            this.presentSequence();
        },

        addToSequence: function () {
            let randomIndex = Math.floor(Math.random() * 4);
            this.targetSequence.push(this.colors[randomIndex]);
            console.log(this.targetSequence);
        },

        presentSequence: function () {
            console.log("Presenting steps");
            for (let i = 0; i < this.targetSequence.length; i++) {
                const step = this.targetSequence[i];
                console.log("Step", step);
                this.colorSounds[step].play();
                sleep(600);
                this.colorSounds[step].pause();
            }
        },

        checkSequences: function () {
            console.log("Checking sequences");
            for (let i = 0; i < this.playerSequence.length; i++) {
                if (this.playerSequence[i] != this.targetSequence[i]) {
                    console.log("Wrong!");
                    return false;
                    this.presentSequence();
                    this.playerSequence = [];
                }
            }

            console.log("Correct!");
            if (this.playerSequence.length == 20) {
                // WINNER
                return false;
            }

            if (this.playerSequence.length == this.targetSequence.length) {
                this.addToSequence();
                this.presentSequence();
                this.playerSequence = [];
            }
        }

    };

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    $(".btn__start").click(function (e) {
        e.preventDefault();
        Simon.startGame();
    });

    $('.circle-quarter').click(function (e) {
        e.preventDefault();
        let color = $(this).data('color');
        Simon.playerSequence.push(color);
        Simon.checkSequences();
    });

});