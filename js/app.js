
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});



// starts new Game when page loads
newGame();

function newGame() {

	//create a new random # between 1 and 100
	//.. and attaches it to the fumnction as an object value
	newGame.secretNum = Math.floor((Math.random() * 100) + 1);

	newGame.guessHolder = [];
	
	// FOR TESTING 
	console.log(newGame.secretNum);

	//reset message fields to default
	$('ul#guessList').html('');
	$('h2#feedback').html('Make your Guess!');
	$('span#count').html('0');
} //end new game function



function makeGuess() {
	event.preventDefault();
	
	//assign the secret # it to a variable
	var genNum = newGame.secretNum;

	//capture current guess input and make it a number
	var currentNum = +$('input#userGuess').val();
	
	// capture message area to give user feedback
	var feedback = $('h2#feedback');

	// capture diference betwen guess and secret #
	var guessDiff = Math.abs(genNum - currentNum);

	var lastGuess = newGame.guessHolder[newGame.guessHolder.length - 1];

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
		newGame.guessHolder.push(currentNum);

		//Gives user initial feedback for guess
			if (guessDiff > 30 ) {
				feedback.html('You guessed ' + currentNum + '<br>You are ice cold');
			} else if ( (guessDiff > 11) && (guessDiff <=30) ) {
				feedback.html('You guessed ' + currentNum + '<br>You are warm');
			} else if ( (guessDiff >= 1) && (guessDiff <=10) ) {
				feedback.html('You guessed ' + currentNum + '<br>You are red hot!');
			} else {
				feedback.html('You guessed it!');
			}

			//Gives Hotter or colder feedback

			if (genNum == currentNum) {
				feedback.prepend('Congratulations!<br>');
			} else if ((Math.abs(lastGuess-genNum)) < guessDiff) {
				feedback.prepend('You are getting colder<br>');
			} else if ((Math.abs(lastGuess-genNum)) > guessDiff) {
				feedback.prepend('You are getting hotter<br>');
			}
	}

	//clears input field after number has been submitted
	$('input#userGuess').val('');
	
} // end makeGuess function



// after first guess compare guess with previous guess and 
// say "Getting warmer" or "Getting cooler"

// get the click event ready to run newGame
$('a.new').on('click', newGame);

// get teh click event ready when the guess buttonis clicked
$('input#guessButton').on('click', makeGuess);

});


