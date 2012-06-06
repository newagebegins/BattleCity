function Sprite() {
  Rect.call(this);
}

Sprite.subclass(Rect);

Sprite.Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

Sprite.Event = {};
Sprite.Event.MOVED = 'Sprite.Event.MOVED';
