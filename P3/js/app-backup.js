// ENEMIES SECTION 
// Enemies our player must avoid
var Enemy = function(startingX, startingY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startingX;
    this.y = startingY;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    if (this.x >500) { 
        this.x = -50;
        if (this.speed < 480)  // put a cap on the speed to avoid racing bugs 
            { this.speed=this.speed + Math.floor(Math.random() * 7 + 1 ) ; 
                // console.log(this.y, this.speed); // display values for debug purposes
            }
            else
                { 
                    this.speed=this.speed - 200 + Math.floor(Math.random() * 7 + 1 ) ; 
                    // console.log("throttled", this.y, this.speed) // display values for debug purposes
                }
    }
    checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER SECTION FOLLOWS

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// GC -- Player class  
var playerstartX = 100;
var playerstartY = 400;
var Player = function() {
    this.x = playerstartX;
    this.y = playerstartY;

    // use char-boy image for player
    this.sprite = 'images/char-boy.png';
};

// GC -- Define player update -- engine requires it
Player.prototype.update = function() {

}

// GC -- render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// GC -- Respond to keys pressed using output of event listener

Player.prototype.handleInput = function(keyPress) {

    // GC -- Change the player's position based on the user keyboard input
    // Also set the boundaries to keep player on canvas and reset if player reaches water
    if (keyPress == 'up') {
        if (this.y > 159) { 
            this.y = this.y - 80; }
            else { player.reset(); }
    } else if (keyPress == 'down') {
        if (this.y < 400 ) {
            this.y = this.y + 80; }
            else { null }
    } else if (keyPress == 'left') {
        if (this.x > 80) {
            this.x = this.x - 100; }
            else { null }
    } else if (keyPress == 'right') {
        if (this.x <380) {
            this.x = this.x + 100; }
            else { null }
    }
}

// COLLISION DETECTION 

var checkCollisions = function(enemyPos) {
    if ((enemyPos.x - player.x < 70 && enemyPos.y - player.y < 50) &&
        (enemyPos.x - player.x > -70 && enemyPos.y - player.y > -50)) {
        player.reset();
        }
};

// Reset player
Player.prototype.reset = function() {
    this.x=100;
    this.y=400;
}

// END COLLISION DETECTION

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// GC instantitiate enemy and define player var
var allEnemies = [];

// Instantiate all enemies
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 7 + 2) * 35;
    allEnemies.push(new Enemy(-60, 60 + 80 * i, tempSpeed));
}

var player = new Player();

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
