/*
	Page events -> user input
*/

var reset = function () {
	boardInstance.reset();
	scoreBoardInstance.reset();
};

/*
	Keyboard events -> user input
*/

$("body").on("keydown", function(event) {
	var key = event.keyCode;
	  console.log(key);
	  switch(key) {
		  // Left key Move the blank to right
	  case 37:
		  boardInstance.move(1, 0);
		  break;
		  // Up key Move the blank to down
	  case 38:
		  boardInstance.move(0, 1);
		  break;
	  case 39:
		  boardInstance.move(-1, 0);
		  break;
	  case 40:
		  boardInstance.move(0, -1);
		  break;
	  }
	  scoreBoardInstance.setMovement(
	  	  boardInstance.state.movement
	  );
	  if (boardInstance.hasWon()) {
	  	  alert("You have won the game!");
		  reset();
	  }
});