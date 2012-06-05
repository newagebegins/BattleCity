function Sprite() {
  Rect.call(this);
}

Sprite.subclass(Rect);

Sprite.Event = {};
Sprite.Event.MOVED = 'Sprite.Event.MOVED';
