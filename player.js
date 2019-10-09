class Player
{
	constructor(num)
	{
		this.location = 0; // location of each player
		this.playerNumber = num; // player number
		this.colours = ["blue", "brown"];
		this.endGame = false; // flag for winning player
	}

	roll(squares) // moving player
	{
		this.clear(squares, this.location);
		var roll = Math.floor(Math.random() * 6) + 1; // generate roll
		this.location += roll;
		if (this.location > 100) // if roll sends them off board
		{
			var remainder = this.location - 100; // bounce back from the finish
			this.location = 100 - remainder;
		}
		else if (this.location == 100) // set winnder flag to true if player is at finish square
		{
			this.endGame = true;
		}
		return roll;
	}

	display(squares) // display player on board
	{
		var int = parseInt(this.location, 10);
		canvasContext.fillStyle = this.colours[this.playerNumber - 1];
		canvasContext.beginPath();
		canvasContext.arc(squares[int]["posX"] + ((5 - this.playerNumber) * SQUAREDIMENSION / 5), squares[int]["posY"] + (this.playerNumber * SQUAREDIMENSION / 4), 10, 0, Math.PI * 2, true); //player position on square relative to player number
		canvasContext.fill();
	}

	clear(squares) // remove player from square
	{
		canvasContext.fillStyle = "#e6e6e6";
		canvasContext.beginPath();
		canvasContext.arc(squares[this.location]["posX"] + ((5 - this.playerNumber) * SQUAREDIMENSION / 5), squares[this.location]["posY"] + (this.playerNumber * SQUAREDIMENSION / 4), 11, 0, Math.PI * 2, true);
		canvasContext.fill();
	}
}