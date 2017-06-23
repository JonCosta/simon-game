$(function() {

    var colors = ["green", "blue", "yellow", "red"];
    var gameSequence = [];
    var yourSequence = [];

    $(".btn__start").click(function (e) { 
        e.preventDefault();
        gameSequence = [];
        simonGame();
    });

    $(".block__green").click(function (e) { 
        e.preventDefault();
        yourSequence.push("green");
        if (yourSequence.length == gameSequence.length) checkSequences();        
    });

    $(".block__red").click(function (e) { 
        e.preventDefault();
        yourSequence.push("red");
        if (yourSequence.length == gameSequence.length) checkSequences();        
    });

    $(".block__yellow").click(function (e) { 
        e.preventDefault();
        yourSequence.push("yellow");
        if (yourSequence.length == gameSequence.length) checkSequences();        
    });

    $(".block__blue").click(function (e) { 
        e.preventDefault();
        yourSequence.push("blue");
        if (yourSequence.length == gameSequence.length) checkSequences();
    });

    function checkSequences() {
        for (let index = 0; index < yourSequence.length; index++) {
            if (yourSequence[index] != gameSequence[index]) {
                console.log("Wrong!");
                return false;
            }
        }
        console.log("Correct!");
        simonGame();
        return true;
    } // endof checkSequences()
    
    function simonGame() {
        if (!gameSequence.length) {
            restart();
        } else {
            let randomIndex = Math.floor(Math.random() * 4);
            gameSequence.push(colors[randomIndex]);
        }
        // Função para tocar música de cada bloco
        console.log(gameSequence);        
        yourSequence = [];
    } // endof simonGame()

    function restart() {
        for (let index = 0; index < 3; index++) {
            let randomIndex = Math.floor(Math.random() * 4);
            gameSequence.push(colors[randomIndex]);
        }
    } // endof restart()

});