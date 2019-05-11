window.onload = function() {
    console.log("ready!");

// Holds all the game words and buttons

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
var cities = ["Bangkok", "London", "Paris", "Dubai", "New York", "Singapore", "Kuala Lumpur", "Istanbul", "Tokyo", "Seoul", "Hong Kong", "Barcelona", "Amsterdam", "Milan", "Taipei", "Rome", "Osaka", "Vienna", "Shanghai", "Prague", "Los Angeles", "Madrid", "Munich", "Miami", "Dublin", "Warsaw", "Cracow"];

var states = ["France", "United States", "Spain", "China", "Italy", "Germany", "United Kingdom", "Mexico", "Thailand", "Turkey", "Austria", "Poland", "Russia", "Canada", "Brazil", "Sweden", "Australia", "Belgium", "Colombia", "Costa Rica", "Croatia", "Denmark", "Iceland", "Japan", "Korea Republic", "Portugal", "Argentina"];

// Following for loop creates buttons for each letter.
for (var i = 0; i < letters.length; i++) {
    var letterBtn = $("<button>");
    letterBtn.addClass("letter letter-button-color");
    letterBtn.attr("data-letter", letters[i]);
    letterBtn.text(letters[i]);
    $("#buttons").append(letterBtn);
}
var gameWords = ["cat","dog","mouse","bird","lizard"];


// 1.1 Generates the random word. Should take a single argument, an array of words and should return a random word from the array
function randomWord(gameWords) {
    var currentWord;
    currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    return gameWords[currentWord];
};




// 1.2 Function will confirm if the onkey is true/matches letters in the word
function isCorrectGuess(words, letter){
    for (var i = 0; i <= words.length; i++) {
        if (words[i] === letter) {
            return true;
        }
    }
    return false;
};
// 1.3 code will generate blanks. based on the length of the word
function getBlanks(words){
    var answerArray = [];
    for (var i = 0; i < words.length; i++){
        answerArray[i] = "_";
    }
    return answerArray;
};
// 1.4 code which will fill in the blanks
function fillBlanks(words, progress, letter){
     if(isCorrectGuess(words, letter)){
         for (var i = 0; i < words.length; i++){
             if (words[i] === letter) {
                 progress[i] = letter;
             }
         }
     }
     return progress;
};

function setupRound(words) {
    var obj = {
        words:words,
        guessesLeft: 9,
        wrongGuesses:[],
        progress: getBlanks(words),
    }
    return obj;
}

function updateRound(obj, letter) {
    if (isCorrectGuess(obj.words, letter) === false) {
        obj.guesseLeft--;
        obj.wrongGuesses.push(letter);
    }
    else {
        fillBlanks(obj.words, obj.progress, letter)
    }
    return obj;
}

function hasWon(progress) {
    for (var i = 0; i < progress.length; i++) {
        if (progress[i] === "_") {
            return false;
        }
    }
    return true;
    let audio = new Audio("");
        audio.play()
}
 
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;

}

function isEndOfRound(obj) {
    if (obj.guesseLeft === 0) {
        return true;
    }
    if (hasWon(obj.progress)) {
        return true;
    }
    return false;
}

function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses, 
        round: setupRound(randomWord(gameWords)),
    }
    return game;
}

function startNewRound(game) {
    var progress = game.round.progress;
    var roundWord = game.round.words;
    if (hasWon(progress) === true) {
        game.wins++;
        x = new Audio("")
        x.onplaying = function ()
        {
            alert("Nice!, the word is " + words + ". Good job smartiePants!");
        }
        x.play();
    } 
    else {
        game.losses++;
        x = new Audio("")
        x.onplaying = function ()
        {
            alert("c'mon! Word was " + words + ". Don't be sorry, be better.")
        }
        x.play();
    }
    return game;
}

var myGame = setupGame(gameWords, 0, 0);

console.log(myGame);

var puzzle = document.getElementById("puzzle-state")
puzzle.innerHTML = myGame.round.progress.join(" ")


var clickPressed;
document.onkeyup = function (event) {
    clickPressed = event.key.toLowerCase()
    console.log( clickPressed + " was clicked");
    isCorrectGuess(myGame.round.words, clickPressed);
    fillBlanks(myGame.round.words, myGame.round.progress,clickPressed);
    updateRound(myGame.round, clickPressed);
    hasWon(myGame.round.progress);
    hasLost(myGame.round.guessesLeft);

if (isEndOfRound(myGame.round)) {
    myGame = startNewRound(myGame);
    myGame.round = setupRound(randomWord(gameWords));
}

document.getElementById("puzzle-state").innerText = myGame.round.progress.join(" ");

document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses;

document.getElementById("wins").innerText = myGame.wins;

document.getElementById("losses").innerText = myGame.losses;

document.getElementById("guesses-left").innerTexxt = myGame.round.guessesLeft;

console.log(myGame);
}

}


