window.onload = function() {
	var board = [ 
		['O','O','O','O','O','O','O','O','O'],
		['O','O','O','O','O','O','O','O','O'],
		['O','O','O','O','O','O','O','O','O'],
		['O','O','O','O','O','O','O','O','O'],
		['O','O','O','O','O','O','O','O','O'],
		['O','O','O','O','O','O','O','O','O'],];
		
	//empty
	emptyImage = "O";
	var empty = emptyImage;
	//user
	userImage = "&#9977";
	var user = userImage;
	userLocationX = 1;
	userLocationY = 2;
	board[userLocationY][userLocationX] = user;
	//wall
	wallImage = "X";
	var wall = wallImage;
	wallLocationX = 2;
	wallLocationY = 2;
	board[wallLocationY][wallLocationX] = wall;
	wallLocationX = 4;
	wallLocationY = 2;
	board[wallLocationY][wallLocationX] = wall;
	wallLocationX = 3;
	wallLocationY = 4;
	board[wallLocationY][wallLocationX] = wall;
	wallLocationX = 4;
	wallLocationY = 1;
	board[wallLocationY][wallLocationX] = wall;
	wallLocationX = 5;
	wallLocationY = 2;
	board[wallLocationY][wallLocationX] = wall;
	//box
	boxImage = "&#9632";
	var box = boxImage;
	boxLocationX = 3;
	boxLocationY = 2;
	board[boxLocationY][boxLocationX] = box;
	//finish
	finishImageBeforeCompletion = "&#9723;";
	finishImageAfterCompletion = "&#9635;";
	var finish = finishImageBeforeCompletion;
	finishLocationX = 5;
	finishLocationY = 1;
	board[finishLocationY][finishLocationX] = finish;
	
	//get outerArrayLength and innerArrayLength
	var outerArrayLength = board.length;
	var innerArrayLength = 0;
	function getInnerArrayLength() {
		for (var i = 0; i < 10; i++) {
			if(typeof(board[0][i]) === "string") {
				innerArrayLength = innerArrayLength + 1;
			}
		}
	}
	getInnerArrayLength();

	function print() {
		console.log(outerArrayLength);
		console.log(innerArrayLength);
	}
	print();

	//create wall pieces in map edges
	function createWalls() {
		// Create left wall pieces
		// board[outerArrayLength][innerArrayLength]
		for (var i = 0; i <= (outerArrayLength - 1); i++) {
		 	board[(i)][0] = wall;
		}
		// board[0][0] = wall;
		// board[1][0] === wallImage;
		// board[2][0] === wallImage;
		// board[3][0] === wallImage;
		// board[4][0] === wallImage;

		// Create upper wall pieces
		for (var i = 1; i <= (innerArrayLength - 1); i++) {
			board[0][i] = wall;
		}
		// board[0][1] === wallImage;
		// board[0][2] === wallImage;
		// board[0][3] === wallImage;
		// board[0][4] === wallImage;
		// board[0][5] === wallImage;

		// Create right wall pieces
		for (var i = 1; i <= (outerArrayLength - 1); i++) {
			board[i][(innerArrayLength -1)] = wall;
		}
		// board[1][5] === wallImage;
		// board[2][5] === wallImage;
		// board[3][5] === wallImage;
		// board[4][5] === wallImage;

		// Create down wall pieces
		// board[outerArrayLength][innerArrayLength]
		for (var i = 1; i <= (innerArrayLength - 2); i++) {
			board[(outerArrayLength - 1)][i] = wall;
		}
		// board[4][1] === wallImage;
		// board[4][2] === wallImage;
		// board[4][3] === wallImage;
		// board[4][4] === wallImage;

		// wallLocationX = 0;
		// wallLocationY = 3;
		// board[wallLocationY][wallLocationX] = wall;
	}
	createWalls();
	
	//loadBoard
	function loadBoard() {
		document.getElementById("boardContainer").innerHTML = board[0][0] + board[0][1] + board[0][2] + board[0][3] + board[0][4] + board[0][5] + board[0][6] + board[0][7] + board[0][8] + "<br>" + 
															  board[1][0] + board[1][1] + board[1][2] + board[1][3] + board[1][4] + board[1][5] + board[1][6] + board[1][7] + board[1][8] + "<br>" +
															  board[2][0] + board[2][1] + board[2][2] + board[2][3] + board[2][4] + board[2][5] + board[2][6] + board[2][7] + board[2][8] + "<br>" +
															  board[3][0] + board[3][1] + board[3][2] + board[3][3] + board[3][4] + board[3][5] + board[3][6] + board[3][7] + board[3][8] + "<br>" +
															  board[4][0] + board[4][1] + board[4][2] + board[4][3] + board[4][4] + board[4][5] + board[4][6] + board[4][7] + board[4][8] + "<br>" +
															  board[5][0] + board[5][1] + board[5][2] + board[5][3] + board[5][4] + board[5][5] + board[5][6] + board[5][7] + board[5][8];
	}
	loadBoard();

	// addEventListener
	window.addEventListener("keydown", function(event) {
		// ArrowLeft
		if (
			event.key === "ArrowLeft"
			// can't go through walls
			&& (board[userLocationY][userLocationX - 1] !== wallImage)
			// can't push box through walls
			&& !(board[userLocationY][userLocationX - 1] === boxImage && board[userLocationY][userLocationX - 2] === wallImage)
			) {
			// if user presses down left arrow key && user is not right next to left wall && box is not right next to left wall while user is right of the box.
			if(userLocationX !== finishLocationX || userLocationY !== finishLocationY) {
				// if is not on finishlocation when left key is pressed before user has moved
				board[userLocationY][userLocationX] = empty;
			} else {
				// if is not on finishlocation when left key is pressed before user has moved
				board[userLocationY][userLocationX] = finish;
			}
			userLocationX = userLocationX - 1;
			board[userLocationY][userLocationX] = user;
			if(userLocationX === boxLocationX && userLocationY === boxLocationY) {
				boxLocationX = boxLocationX - 1;
				board[boxLocationY][boxLocationX] = box;
			}
			if(boxLocationX === finishLocationX && boxLocationY === finishLocationY) {
				document.getElementById("endText").innerHTML = "Good Game!";
				finish = finishImageAfterCompletion;
			}
			loadBoard();
		}
		// ArrowUp
		if (
			event.key === "ArrowUp"
			// can't go through walls
			&& (board[userLocationY - 1][userLocationX] !== wallImage)
			// can't push box through walls
			&& !(board[userLocationY - 1][userLocationX] === boxImage && board[userLocationY - 2][userLocationX] === wallImage)
			) {
			// if user presses down top arrow key && user is not right next to top wall && box is not right next to top wall while user is right of the box.
			if(userLocationX !== finishLocationX || userLocationY !== finishLocationY) {
				// if is not on finishlocation when up key is pressed before user has moved
				board[userLocationY][userLocationX] = empty;
			} else {
				// if is not on finishlocation when up key is pressed before user has moved
				board[userLocationY][userLocationX] = finish;
			}
			userLocationY = userLocationY - 1;
			board[userLocationY][userLocationX] = user;
			if(userLocationX === boxLocationX && userLocationY === boxLocationY) {
				boxLocationY = boxLocationY - 1;
				board[boxLocationY][boxLocationX] = box;
			}
			if(boxLocationX === finishLocationX && boxLocationY === finishLocationY) {
				document.getElementById("endText").innerHTML = "Good Game!";
				finish = finishImageAfterCompletion;
			}
			loadBoard();
		}
		// ArrowRight
		if (
			event.key === "ArrowRight"
			// can't go through walls
			&& (board[userLocationY][userLocationX + 1] !== wallImage)
			// can't push box through walls
			&& !(board[userLocationY][userLocationX + 1] === boxImage && board[userLocationY][userLocationX + 2] === wallImage)
			 ) {
			// if user presses down right arrow key && user is not right next to right wall && box is not right next to right wall while user is right of the box.
			if(userLocationX !== finishLocationX || userLocationY !== finishLocationY) {
				// if is not on finishlocation when right key is pressed before user has moved
				board[userLocationY][userLocationX] = empty;
			} else {
				// if is not on finishlocation when right key is pressed before user has moved
				board[userLocationY][userLocationX] = finish;
			}
			userLocationX = userLocationX + 1;
			board[userLocationY][userLocationX] = user;
			if(userLocationX === boxLocationX && userLocationY === boxLocationY) {
				boxLocationX = boxLocationX + 1;
				board[boxLocationY][boxLocationX] = box;
			}
			if(boxLocationX === finishLocationX && boxLocationY === finishLocationY) {
				document.getElementById("endText").innerHTML = "Good Game!";
				finish = finishImageAfterCompletion;
			}
			loadBoard();
		}
		// ArrowDown
		if (
			event.key === "ArrowDown"
			// can't go through walls
			&& (board[userLocationY + 1][userLocationX] !== wallImage)
			// can't push box through walls
			&& !(board[userLocationY + 1][userLocationX] === boxImage && board[userLocationY + 2][userLocationX] === wallImage)
			) {
			// if user presses down down arrow key && user is not right next to down wall && box is not right next to down wall while user is right of the box.
			if(userLocationX !== finishLocationX || userLocationY !== finishLocationY) {
				// if is not on finishlocation when down key is pressed before user has moved
				board[userLocationY][userLocationX] = empty;
			} else {
				// if is not on finishlocation when down key is pressed before user has moved
				board[userLocationY][userLocationX] = finish;
			}
			userLocationY = userLocationY + 1;
			board[userLocationY][userLocationX] = user;
			if(userLocationX === boxLocationX && userLocationY === boxLocationY) {
				boxLocationY = boxLocationY + 1;
				board[boxLocationY][boxLocationX] = box;
			}
			if(boxLocationX === finishLocationX && boxLocationY === finishLocationY) {
				document.getElementById("endText").innerHTML = "Good Game!";
				finish = finishImageAfterCompletion;
			}
			loadBoard();
		}
	}, true)
};