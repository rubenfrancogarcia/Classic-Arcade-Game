//numbers represent pixels
//This creates a class for our enemies and addresses inputs
class Enemy {
  constructor(x, y, speed){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = 60 + y;
    this.step = 101;
    this.speed = speed;
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //sets the enemy loop to continously run along canvas
    if (this.x < 5 * this.step){
      this.x +=  this.speed * dt;
    }
    else {
       this.x = -this.x;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor(){
    this.step = 101;
    this.jump = 83;
    this.startx = this.step * 2;
    this.starty = (this.jump * 4) + 60;
    this.x = this.startx;
    this.y = this.starty;
    this. sprite = 'images/char-boy.png'
    this.victory = false;
  }
  //draws canvas images.. player
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
//when the player crashes into an enemy it restarts them at stating point
  reset(){
    this.x = this.startx;
    this.y = this.starty;
  }

  //determines action for crashing into a enemy or reaching the goal tile
  update(){
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/3 > this.x && enemy.x + enemy.step/3 < this.step + this.x )) {
        this.reset();
      }
      if (this.y === 60) {
        this.victory = true;
      }
    }
  }

  //determines the direction the player moves in response to keyboard action
  handleInput(input){
    switch(input) {
      case "left":
       if(this.x>0){
         this.x -= this.step;
       }
        break;
      case "right":
      if(this.x < 4 * this.step){
        this.x += this.step;
      }
        break;
      case "up":
      if(this.y > this.jump){
        this.y -= this.jump;
      }
        break;
      case "down":
      if(this.y < this.jump * 4){
        this.y += this.jump;
      }
        break;
    }
  }
}

//creation of all enemies with various inputs within an array
const allEnemies = [
  new Enemy(-101, 0, 400),
  new Enemy(-101, 83, 300),
  new Enemy(-101, 166, 275),
  new Enemy(-101, 0, 255),
  new Enemy(-202, 0, 275),
  new Enemy(-202, 166, 255),
  new Enemy(-202, 83, 255),
  new Enemy(-202, 0, 500),
  new Enemy(-202, 0, 450),
  new Enemy(-202, 83, 255),
  new Enemy(-202, 0, 500),
  new Enemy(-202, 0, 700)

];

//our player created
const player = new Hero();

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
