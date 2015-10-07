$(document).ready(function() {
  "use strict";

  /*--- Display information modal box ---*/
  $(".what").click(function() {
    $(".overlay").fadeIn(1000);

  });

  /*--- Hide information modal box ---*/
  $("a.close").click(function() {
    $(".overlay").fadeOut(1000);
  });

  // sets up variables
  var secretNum,
    guessHolder,
    temp;

  function newGame() {

      //create a new random # between 1 and 100
      secretNum = Math.floor((Math.random() * 100) + 1);

      guessHolder = [];

      // FOR TESTING 
      console.log(secretNum);

      //reset message fields to default
      $('ul#guessList').html('');
      $('h2#feedback').html('Make your Guess!');
      $('span#count').html('0');
    } //end new game function

  function makeGuess() {
      event.preventDefault();

      //capture current guess input and make it a number
      var currentNum = +$('input#userGuess').val();

      // capture message area to give user feedback
      var feedback = $('h2#feedback');

      // capture diference betwen guess and secret #
      var guessDiff = Math.abs(secretNum - currentNum);

      var lastGuess = guessHolder[guessHolder.length - 1];

      // validate guess and tell user to fix if NaN or <0 or >100
      if (!currentNum || currentNum < 0 || currentNum > 100) {
        feedback.html('Please enter a number between<br>0 and 100');
      } else {

        // increments current guess count by 1
        var guessCount = +$('span#count').text();
        $('span#count').text(guessCount + 1);

        //add guesses in guess count
        $('ul#guessList').append('<li>' + currentNum + '</li>');

        //push current guess into guessholder array
        guessHolder.push(currentNum);

        //Gives user initial feedback for guess
        if (guessDiff > 30) {
          feedback.html('You guessed ' + currentNum + '<br><span class="status"><em>Status:</em> You are ice cold</span>');
          temp = "cold";
        } else if ((guessDiff > 11) && (guessDiff <= 30)) {
          feedback.html('You guessed ' + currentNum + '<br><span class="status"><em>Status:</em> You are warm</span>');
          temp = "warm";
        } else if ((guessDiff >= 1) && (guessDiff <= 10)) {
          feedback.html('You guessed ' + currentNum + '<br><span class="status"><em>Status:</em> You are red hot!</span>');
          temp = "hot";
        } else {
          feedback.html('You guessed it!');
        }

        //Gives Hotter or colder feedback

        if (secretNum == currentNum) {
          feedback.prepend('Congratulations!<br>');
        } else if ((Math.abs(lastGuess - secretNum)) < guessDiff) {
          feedback.prepend('You are getting colder<br>');
        } else if ((Math.abs(lastGuess - secretNum)) > guessDiff) {
          feedback.prepend('You are getting hotter<br>');
        } else if (lastGuess === secretNum) {
          feedback.prepend('Hey! You just guessed that! Try again<br>');
        } else if (!lastGuess) {
          if (temp === "cold") {
            feedback.prepend('Whoa bad guess! Try again!<br>');
          } else if (temp === "warm") {
            feedback.prepend('Good Start! Try again!<br>');
          } else {
            feedback.prepend('Great Start! Try again!<br>');
          }
        } else {
          feedback.prepend('Same diference - try again!<br>');
        }

      }

      //clears input field after number has been submitted
      $('input#userGuess').val('');

    } // end makeGuess function

  // starts new Game when page loads
  newGame();

  // get the click event ready to run newGame
  $('a.new').on('click', newGame);

  // get teh click event ready when the guess buttonis clicked
  $('input#guessButton').on('click', makeGuess);

});