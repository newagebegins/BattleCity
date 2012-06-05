function Tank() {
  this._position = new Position(0, 0);
  this._speed = 0;
  this._direction = Direction.RIGHT;
}

Tank.prototype = {
  getPosition: function () {
    return this._position;
  },
  
  setPosition: function (position) {
    this._position = position;
  },
  
  getSpeed: function () {
    return this._speed;
  },
  
  setSpeed: function (speed) {
    this._speed = speed;
  },
  
  getDirection: function () {
    return this._direction;
  },
  
  setDirection: function (direction) {
    this._direction = direction;
  },
  
  move: function () {
    this._position = new Position(this._getNewX(), this._getNewY());
  },
  
  _getNewX: function () {
    var result = this._position.getX();
      
    if (this._direction == Direction.RIGHT) {
      result += this._speed;
    }
    else if (this._direction == Direction.LEFT) {
      result -= this._speed;
    }
    
    return result;
  },
  
  _getNewY: function () {
    var result = this._position.getY();
      
    if (this._direction == Direction.UP) {
      result -= this._speed;
    }
    else if (this._direction == Direction.DOWN) {
      result += this._speed;
    }
    
    return result;
  }
};
