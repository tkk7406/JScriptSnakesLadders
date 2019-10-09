var squares = []; // array of all squares
var index = 1; // used to display numbers on squares
var player1;
var player2;
var turn = 1; // whose turn it is

const SQUAREDIMENSION = 100;


function mousePosition(event) // function to get mouse position relative to canvas
{
	var rectangle = canvas.getBoundingClientRect();
	var page = document.documentElement;
	var mouseX = event.clientX - rectangle.left - page.scrollLeft;
	var mouseY = event.clientY - rectangle.top - page.scrollTop;
	return {x: mouseX, y: mouseY};
}

window.onload = function()
{
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	canvas.width = 11 * SQUAREDIMENSION;
	canvas.height = 11 * SQUAREDIMENSION;
	var squareX = SQUAREDIMENSION; // setting x pointer for drawing a square
	var squareY = canvas.height - SQUAREDIMENSION; // setting y pointer for drawing a square
	var direction = 1; // draw squares to the right or left
	//canvasContext.strokeStyle = "black"; // colour of text
	squares.push(new Square(0, 0, squareY))	// draw starting square
	squares[0].display();
	for (var y = 0; y < 10; y++)
	{
		for (var x = 0; x < 10; x++)
		{
			var square = new Square(index, squareX, squareY); // create, display and add square to list
			square.display();
			squares.push(square);
			squareX = squareX + (direction * SQUAREDIMENSION); // move x pointer
			index++; // draw next number
		}
		if (y % 2 == 0)
		{
			squareX -= SQUAREDIMENSION; // calibrate x pointer for next row
		}
		else
		{
			squareX += SQUAREDIMENSION;
		}
		squareY -= SQUAREDIMENSION; // move y pointer
		direction *= -1; // switch direction
	}
	canvasContext.lineWidth = (10 * SQUAREDIMENSION * 10 * SQUAREDIMENSION) / 100000; // draw outline of canvas
	canvasContext.strokeRect(0, 0, canvas.width, canvas.height);
	player1 = new Player(1); // create players
	player2 = new Player(2);
	status(0, 0); // display welcome message
	refreshElements();
	rollButton(); // display button
}

function refreshElements() // display players, snakes and ladders
{
	snakes();
	ladders();
	player1.display(squares);
	player2.display(squares);
}

function rollButton()
{
	var offset = (10 * SQUAREDIMENSION * 10 * SQUAREDIMENSION) / 200000;
	var x = offset;
	var y = SQUAREDIMENSION - (1.5 * offset) + offset;
	var width = SQUAREDIMENSION - (1.5 * offset);
	var height = canvas.height - (2 * SQUAREDIMENSION);
	drawRectangle(x, y, width, height, "orange"); // draw button
	typeText("Roll", x + (width / 2), y + (height / 2));
	canvas.addEventListener('click', function(event)
	{
		var mousePos = mousePosition(event);
	    if (x < mousePos.x && mousePos.x < width + x && y < mousePos.y && mousePos.y < height + y) // if mouse is clicked within the button boundaries
	    {
	    	var rollResult;
	    	var location;
	    	var winner;
	    	winner = turn;
			if (turn == 1)
			{
				location = player1.location;
				rollResult = player1.roll(squares); // move player
				status(rollResult, location, turn); // show progress
				turn = 2; // switch turn
				refreshElements(); // update board
			}
			else if (turn == 2)
			{
				location = player2.location;
				rollResult = player2.roll(squares); // move player
				status(rollResult, location, turn); // show progress
				turn = 1; // switch turn
				refreshElements(); // update board
			}
			if (player1.endGame == true || player2.endGame == true) // if game is over
			{
				var finish;
				drawRectangle(offset, offset, canvas.width - (2 * offset), SQUAREDIMENSION - (1.5 * offset), "turquoise");
				typeText('Player ' + winner + ' won. Click "Roll" to begin.', canvas.width / 2, canvas.height / 18); // display winner
				finish = confirm("Player " + winner + " rolled " + rollResult + " from " + location + " and won the game! Click ok to continue."); // prompt another game
				player1.endGame = false;
				player2.endGame = false;
				if (finish)
				{
					player1.clear(squares); // reset player positions
					player2.clear(squares);
					player1.location = 0;
					player2.location = 0;
					player1.display(squares);
					player2.display(squares);
				}
			}
	    }
	}, false);

}

function status(roll, prevLocation, player) // display game status
{
	var offset = (10 * SQUAREDIMENSION * 10 * SQUAREDIMENSION) / 200000;
	drawRectangle(offset, offset, canvas.width - (2 * offset), SQUAREDIMENSION - (1.5 * offset), "turquoise");
	if (roll == 0 || player == 0)
	{
		typeText("Welcome to Snakes and Ladders! Your turn Player 1.", canvas.width / 2, canvas.height / 18);
	}
	else if (player == 1)
	{
		typeText("Player 1 just rolled " + roll + " from " + prevLocation + ". Your turn Player 2.", canvas.width / 2, canvas.height / 18);
	}
	else if (player == 2)
	{
		typeText("Player 2 just rolled " + roll + " from " + prevLocation + ". Your turn Player 1.", canvas.width / 2, canvas.height / 18);
	}
}

function snakes()
{
	var allSnakes = [
		[17, 7],
		[54, 34],
		[62, 19],
		[64, 60],
		[87, 36],
		[93, 73],
		[95, 75],
		[98, 79]
	]; // predefined list of snakes
	canvasContext.strokeStyle = "red";
	for (var i = 0; i < allSnakes.length; i++) // draw all snakes
	{
		var origin = squares[allSnakes[i][0]].centre();
		var destination = squares[allSnakes[i][1]].centre();
		canvasContext.beginPath();
		canvasContext.moveTo(origin[0], origin[1]);
		canvasContext.lineTo(destination[0], destination[1]);
		canvasContext.stroke();
	}
	for (var i = 0; i < allSnakes.length; i++) // if players step on snakes move them down
	{
		if (player1.location == allSnakes[i][0])
		{
			player1.clear(squares);
			player1.location = allSnakes[i][1];
			refreshElements();
		}
		else if (player2.location == allSnakes[i][0])
		{
			player2.clear(squares);
			player2.location = allSnakes[i][1];
			refreshElements();
		}
	}
}

function ladders()
{
	var allLadders = [
		[1, 38],
		[4, 14],
		[9, 31],
		[21, 42],
		[28, 84],
		[51, 67],
		[72, 91],
		[80, 99]
	]; // predefined list of ladders
	canvasContext.strokeStyle = "limegreen";
	for (var i = 0; i < allLadders.length; i++) // draw all ladders
	{
		var origin = squares[allLadders[i][0]].centre();
		var destination = squares[allLadders[i][1]].centre();
		canvasContext.beginPath();
		canvasContext.moveTo(origin[0], origin[1]);
		canvasContext.lineTo(destination[0], destination[1]);
		canvasContext.stroke();
	}
	for (var i = 0; i < allLadders.length; i++) // if players step on ladders move them up
	{
		if (player1.location == allLadders[i][0])
		{
			player1.clear(squares);
			player1.location = allLadders[i][1];
			refreshElements();
		}
		else if (player2.location == allLadders[i][0])
		{
			player2.clear(squares);
			player2.location = allLadders[i][1];
			refreshElements();
		}
	}
}

function drawRectangle(initX, initY, width, height, colour) // helper function for rectangles
{
	canvasContext.fillStyle = colour;
	canvasContext.fillRect(initX, initY, width, height);
}

function typeText(text, x, y) // helper function for text
{	
	canvasContext.font = "28px Arial";
	canvasContext.textAlign = "center";
	canvasContext.fillStyle = "black";
	canvasContext.fillText(text, x, y);
}