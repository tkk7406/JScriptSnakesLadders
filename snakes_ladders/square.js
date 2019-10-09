class Square
{
	constructor(number, x, y)
	{
		this.num = number; // square number
		this.posX = x; // x coordinate
		this.posY = y; // y coordinate
	}

	display() // display square on board
	{
		canvasContext.fillStyle = "#e6e6e6";
		canvasContext.fillRect(this.posX, this.posY, SQUAREDIMENSION, SQUAREDIMENSION);
		canvasContext.strokeStyle = "black";
		canvasContext.lineWidth = (10 * SQUAREDIMENSION * 10 * SQUAREDIMENSION) / 200000;
		canvasContext.strokeRect(this.posX, this.posY, SQUAREDIMENSION, SQUAREDIMENSION);
		if (this.posX == 0)
		{
			this.typeText(this.num, this.posX + 7, this.posY + 36);
		}
		else
		{
			this.typeText(this.num, this.posX + 5, this.posY + 36);
		}
	}

	typeText(text, posX, posY) // helper function for text
	{
		canvasContext.font = "36px Arial";
		canvasContext.fillStyle = "black";
		canvasContext.fillText(text, posX, posY);
	}

	centre() // get centre coordinates of square
	{
		var centreX = this.posX + (SQUAREDIMENSION / 2);
		var centreY = this.posY + (SQUAREDIMENSION / 2);
		return [centreX, centreY];
	}
}
