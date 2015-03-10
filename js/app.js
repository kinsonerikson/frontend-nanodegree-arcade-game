// Enemies our player must avoid
var Enemy = function(startX,startY,startSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x=startX;
	this.y=startY;
	this.speed = startSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + (this.speed*dt);
	if(this.x>=505) {
		this.x = -100;
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This function generates a random number between minValue and maxValue, inclusive
// Thanks stackoverflow! http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function randomize(minValue,maxValue) {
	return Math.random() * (maxValue - minValue) + minValue;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.sprite = 'images/char-boy.png';
	//Hard coded starting positions are for the bottom-middle tile.
	this.x=200;
	this.y=380;
}
Player.prototype.handleInput = function(keyPress) {
	//Move the character up the screen by subtracting pixels since top of the screen is 0, but don't go above -20 or that will be "off the board"
	if(keyPress == "up") {
		var newPos = this.y-=80;
		if(newPos < -20) {
			newPos = -20;	
		}
		this.y=newPos;
	}	
	//Move the character up the screen by adding pixels since bottom of the screen is ~606,  but don't go below 380 or that will be "off the board"
	if(keyPress == "down") {
		var newPos = this.y+=80;
		if(newPos > 380) {
			newPos = 380;
		}
		this.y=newPos;
	}
	//Move the character up the screen by subtracting pixels since left of the screen is 0,  but don't go below 0 or that will be "off the board"
	if(keyPress == "left") {
		var newPos = this.x-=100;
		if(newPos < 0) {
			newPos = 0;
		}
		this.x = newPos;
	}
	//Move the character up the screen by adding pixels since right of the screen is ~500,  but don't go above 400 or that will be "off the board"
	if(keyPress == "right") {
		var newPos = this.x+=100;
		if(newPos > 400) {
			newPos = 400;
		}
		this.x = newPos;
	}
	
}
Player.prototype.update = function() {
	//Collision Detection! This loops through all of the enemies and figures out what their min x and max x positions are
	for(var i=0;i<allEnemies.length;i++)
	{
		e = allEnemies[i];
		minP = this.x;
		maxP = this.x+101;
		minE = e.x;
		maxE = e.x+101;
		//Okay breaking down the logic here:
		//If the leftX and the rightX are within the leftX and rightx values of an enemy AND they're on the same
		//row, that's a hit.
		if(((minP >= minE && minP<=maxE) || (maxP >= minE && maxP <=maxE)) && this.y == e.y)
		{
			this.y = 380;
			this.x = 200;
		}
	}
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
var startY = 60;
for(var i=0;i<3;i++) {
	var startX = randomize(100,500);
	var startSpeed = randomize(100,400);
	allEnemies.push(new Enemy(startX,startY,startSpeed));
	startY+=80;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
