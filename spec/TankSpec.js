describe("Tank", function () {
  var eventManager, tank;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
  });
  
  describe("#shoot", function () {
    it("should fire event", function () {
      spyOn(eventManager, "fireEvent");
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
    });
    
    it("one bullet", function () {
      spyOn(eventManager, "fireEvent");
      tank.setBulletsLimit(1);
      tank.shoot();
      eventManager.fireEvent.reset();
      tank.shoot();
      expect(eventManager.fireEvent).not.toHaveBeenCalled();
      tank.notify({'name': Bullet.Event.DESTROYED, 'tank': tank});
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
    });
    
    it("two bullets", function () {
      spyOn(eventManager, "fireEvent");
      tank.setBulletsLimit(2);
      tank.shoot();
      eventManager.fireEvent.reset();
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
      eventManager.fireEvent.reset();
      tank.shoot();
      expect(eventManager.fireEvent).not.toHaveBeenCalled();
      tank.notify({'name': Bullet.Event.DESTROYED, 'tank': tank});
      tank.shoot();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Tank.Event.SHOOT,
        'tank': tank});
      eventManager.fireEvent.reset();
      tank.shoot();
      expect(eventManager.fireEvent).not.toHaveBeenCalled();
    });
  });
  
  it("#update", function () {
    var state = new TankStateNormal(tank);
    spyOn(state, 'update');
    tank.setState(state);
    tank.updateHook();
    expect(state.update).toHaveBeenCalled();
  });
  
  describe("#resolveCollisionWithSprite", function () {
    it("tank moves right", function () {
      checkDirection(new Rect(1, 1, 2, 2), new Rect(2, 1, 2, 2), Sprite.Direction.RIGHT, new Point(0, 1));
    });
    
    it("tank moves left", function () {
      checkDirection(new Rect(2, 1, 2, 2), new Rect(1, 1, 2, 2), Sprite.Direction.LEFT, new Point(3, 1));
    });
    
    it("tank moves up", function () {
      checkDirection(new Rect(1, 2, 2, 2), new Rect(1, 1, 2, 2), Sprite.Direction.UP, new Point(1, 3));
    });
    
    it("tank moves down", function () {
      checkDirection(new Rect(1, 1, 2, 2), new Rect(1, 2, 2, 2), Sprite.Direction.DOWN, new Point(1, 0));
    });
    
    function checkDirection(tankRect, wallRect, direction, resolvedTankPosition) {
      tank.setRect(tankRect);
      tank.setDirection(direction);
      var wall = new Wall(eventManager);
      wall.setRect(wallRect);
      tank.resolveCollisionWithSprite(wall);
      expect(tank.getPosition()).toEqual(resolvedTankPosition);
    }
  });
  
  describe("#resolveCollisionWithSprite", function () {
    it("resolving move is too big - don't resolve", function () {
      checkMove(1, new Point(0, 0));
    });
    
    it("normal resolving move - resolve", function () {
      checkMove(2, new Point(-2, 0));
    });
    
    function checkMove(limit, expectedPos) {
      tank.setCollisionResolvingMoveLimit(limit);
      tank.setRect(new Rect(0, 0, 3, 3));
      tank.setDirection(Sprite.Direction.RIGHT);
      var otherTank = new Wall(eventManager);
      otherTank.setRect(new Rect(1, 0, 3, 3));
      tank.resolveCollisionWithSprite(otherTank);
      expect(tank.getPosition()).toEqual(expectedPos);
    }
  });
  
  it("should resolve collision when collides with a wall", function () {
    spyOn(tank, 'resolveCollisionWithSprite');
    var wall = new Wall(eventManager);
    tank.notify({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'sprite': wall});
    expect(tank.resolveCollisionWithSprite).toHaveBeenCalledWith(wall);
  });
  
  it("should resolve collision when collides with a base", function () {
    spyOn(tank, 'resolveCollisionWithSprite');
    var base = new Base(eventManager);
    tank.notify({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'sprite': base});
    expect(tank.resolveCollisionWithSprite).toHaveBeenCalledWith(base);
  });
  
  it("should resolve collision when collides with water", function () {
    spyOn(tank, 'resolveCollisionWithSprite');
    var water = new Water(eventManager);
    tank.notify({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'sprite': water});
    expect(tank.resolveCollisionWithSprite).toHaveBeenCalledWith(water);
  });
  
  describe("collision with a tank", function () {
    it("normal tank", function () {
      spyOn(tank, 'resolveCollisionWithSprite');
      var otherTank = new Tank(eventManager);
      tank.notify({
        'name': CollisionDetector.Event.COLLISION,
        'initiator': tank,
        'sprite': otherTank});
      expect(tank.resolveCollisionWithSprite).toHaveBeenCalledWith(otherTank);
    });
    
    it("appearing tank", function () {
      spyOn(tank, 'resolveCollisionWithSprite');
      var otherTank = new Tank(eventManager);
      otherTank.setState(new TankStateAppearing(otherTank));
      tank.notify({
        'name': CollisionDetector.Event.COLLISION,
        'initiator': tank,
        'sprite': otherTank});
      expect(tank.resolveCollisionWithSprite).not.toHaveBeenCalled();
    });
  });
  
  it("should resolve collision when goes out of bounds", function () {
    spyOn(tank, 'resolveOutOfBounds');
    var bounds = new Rect(0, 0, 100, 100);
    tank.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': tank, 'bounds': bounds});
    expect(tank.resolveOutOfBounds).toHaveBeenCalledWith(bounds);
  });
  
  describe("smooth turn", function () {
    beforeEach(function () {
      tank.setTurnSmoothSens(3);
      tank.setTurnRoundTo(2);
      tank.setDimensions(1, 1);
      tank.setSpeed(1);
    });
    
    it("right-up-1", function () {
      tank.setTurnSmoothSens(10);
      tank.setTurnRoundTo(16);
      tank.setDimensions(2, 2);
      tank.setSpeed(2);
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.setPosition(new Point(12, 7));
      tank.setDirection(Sprite.Direction.UP);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(16, 5));
    });
    
    it("right-up-2", function () {
      tank.setTurnSmoothSens(10);
      tank.setTurnRoundTo(16);
      tank.setDimensions(2, 2);
      tank.setSpeed(2);
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.setPosition(new Point(6, 7));
      tank.setDirection(Sprite.Direction.UP);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(6, 5));
    });
    
    it("right-down", function () {
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.setPosition(new Point(5, 0));
      tank.setDirection(Sprite.Direction.DOWN);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(6, 1));
    });
    
    it("left-down", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      tank.setPosition(new Point(3, 1));
      tank.setDirection(Sprite.Direction.DOWN);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(2, 2));
    });
    
    it("left-up-1", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      tank.setPosition(new Point(6, 2));
      tank.setDirection(Sprite.Direction.UP);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(6, 1));
    });
    
    it("left-up-2", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      tank.setPosition(new Point(7, 2));
      tank.setDirection(Sprite.Direction.UP);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(6, 1));
    });
    
    it("down-right", function () {
      tank.setDirection(Sprite.Direction.DOWN);
      tank.setPosition(new Point(3, 0));
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(4, 2));
    });
    
    it("down-left", function () {
      tank.setDirection(Sprite.Direction.DOWN);
      tank.setPosition(new Point(3, 0));
      tank.setDirection(Sprite.Direction.LEFT);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(2, 2));
    });
    
    it("up-left", function () {
      tank.setDirection(Sprite.Direction.UP);
      tank.setPosition(new Point(3, 3));
      tank.setDirection(Sprite.Direction.LEFT);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(2, 2));
    });
    
    it("up-right", function () {
      tank.setDirection(Sprite.Direction.UP);
      tank.setPosition(new Point(3, 3));
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(4, 2));
    });
    
    it("left-right", function () {
      tank.setDirection(Sprite.Direction.LEFT);
      tank.setPosition(new Point(3, 3));
      tank.setDirection(Sprite.Direction.RIGHT);
      tank.move();
      expect(tank.getPosition()).toEqual(new Point(4, 3));
    });
  });
  
  describe("#notify", function () {
    it("TankStateAppearing.Event.END", function () {
      spyOn(tank, 'stateAppearingEnd');
      tank.notify({'name': TankStateAppearing.Event.END, 'tank': tank});
      expect(tank.stateAppearingEnd).toHaveBeenCalled();
    });
    
    it("TankStateInvincible.Event.END", function () {
      tank.setState(new TankStateInvincible(tank));
      tank.notify({'name': TankStateInvincible.Event.END, 'tank': tank});
      expect((tank.getState() instanceof TankStateNormal) && !(tank.getState() instanceof TankStateInvincible)).toBeTruthy();
    });
    
    describe("CollisionDetector.Event.COLLISION", function () {
      describe("bullet", function () {
        it("other's bullet", function () {
          spyOn(tank, 'hit');
          var otherTank = new Tank(eventManager);
          var bullet = new Bullet(eventManager, otherTank);
          tank.notify({
            'name': CollisionDetector.Event.COLLISION,
            'initiator': bullet,
            'sprite': tank});
          expect(tank.hit).toHaveBeenCalled();
        });
        
        it("own bullet", function () {
          spyOn(tank, 'hit');
          var bullet = new Bullet(eventManager, tank);
          tank.notify({
            'name': CollisionDetector.Event.COLLISION,
            'initiator': bullet,
            'sprite': tank});
          expect(tank.hit).not.toHaveBeenCalled();
        });
        
        it("enemy shot enemy", function () {
          spyOn(tank, 'hit');
          tank.makeEnemy();
          var otherTank = new Tank(eventManager);
          otherTank.makeEnemy();
          var bullet = new Bullet(eventManager, otherTank);
          tank.notify({
            'name': CollisionDetector.Event.COLLISION,
            'initiator': bullet,
            'sprite': tank});
          expect(tank.hit).not.toHaveBeenCalled();
        });
        
        it("invincible", function () {
          tank.setState(new TankStateInvincible(tank));
          spyOn(tank, 'hit');
          var otherTank = new Tank(eventManager);
          var bullet = new Bullet(eventManager, otherTank);
          tank.notify({
            'name': CollisionDetector.Event.COLLISION,
            'initiator': bullet,
            'sprite': tank});
          expect(tank.hit).not.toHaveBeenCalled();
        });
      });
    });
  });
  
  describe("#hit", function () {
    it("normal tank", function () {
      tank.setHitLimit(1);
      spyOn(tank, 'destroy');
      tank.hit();
      expect(tank.destroy).toHaveBeenCalled();
    });
    
    it("armored tank", function () {
      tank.setHitLimit(4);
      spyOn(tank, 'destroy');
      tank.hit();
      expect(tank.destroy).not.toHaveBeenCalled();
      tank.hit();
      expect(tank.destroy).not.toHaveBeenCalled();
      tank.hit();
      expect(tank.destroy).not.toHaveBeenCalled();
      tank.hit();
      expect(tank.destroy).toHaveBeenCalled();
    });
    
    it("color", function () {
      var color = new TankColor();
      tank.setColor(color);
      spyOn(color, 'hit');
      tank.hit();
      expect(color.hit).toHaveBeenCalled();
    });
  });
  
  describe("#stateAppearingEnd", function () {
    beforeEach(function () {
      tank.setState(new TankStateAppearing(tank));
    });
    
    describe("player", function () {
      it("state", function () {
        tank.stateAppearingEnd();
        expect(tank.getState() instanceof TankStateInvincible).toBeTruthy();
      });

      it("direction", function () {
        tank.setDirection(Sprite.Direction.DOWN);
        tank.stateAppearingEnd();
        expect(tank.getDirection()).toEqual(Sprite.Direction.UP);
      });
    });
    
    describe("enemy", function () {
      beforeEach(function () {
        tank.makeEnemy();
      });
      
      it("state", function () {
        tank.stateAppearingEnd();
        expect(tank.getState() instanceof TankStateNormal).toBeTruthy();
      });

      it("direction", function () {
        tank.setDirection(Sprite.Direction.UP);
        tank.stateAppearingEnd();
        expect(tank.getDirection()).toEqual(Sprite.Direction.DOWN);
      });
    });
  });
  
  describe("#destroyHook", function () {
    beforeEach(function () {
      spyOn(eventManager, 'fireEvent');
    });
    
    it('common', function () {
      tank.destroyHook();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Tank.Event.DESTROYED, 'tank': tank});
    });
    
    it('player', function () {
      tank.destroyHook();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Tank.Event.PLAYER_DESTROYED, 'tank': tank});
    });
    
    it('enemy', function () {
      tank.makeEnemy();
      tank.destroyHook();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Tank.Event.ENEMY_DESTROYED, 'tank': tank});
    });
    
    it("flashing", function () {
      tank.startFlashing();
      tank.destroyHook();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Tank.Event.FLASHING_TANK_DESTROYED, 'tank': tank});
    });
  });
  
  describe("#upgrade", function () {
    it("first", function () {
      expect(tank.getUpgradeLevel()).toEqual(0);
      expect(tank.getBulletSpeed()).toEqual(Bullet.Speed.NORMAL);

      tank.upgrade();

      expect(tank.getUpgradeLevel()).toEqual(1);
      expect(tank.getBulletSpeed()).toEqual(Bullet.Speed.FAST);
    });
    
    it("second", function () {
      tank.upgrade();
      
      expect(tank.getUpgradeLevel()).toEqual(1);
      expect(tank.getBulletsLimit()).toEqual(1);

      tank.upgrade();

      expect(tank.getUpgradeLevel()).toEqual(2);
      expect(tank.getBulletsLimit()).toEqual(2);
    });
    
    it("third", function () {
      tank.upgrade();
      tank.upgrade();
      
      expect(tank.getUpgradeLevel()).toEqual(2);
      expect(tank.getBulletType()).toEqual(Bullet.Type.NORMAL);

      tank.upgrade();

      expect(tank.getUpgradeLevel()).toEqual(3);
      expect(tank.getBulletType()).toEqual(Bullet.Type.ENHANCED);
    });
    
    it("fourth", function () {
      tank.upgrade();
      tank.upgrade();
      tank.upgrade();
      
      expect(tank.getUpgradeLevel()).toEqual(3);

      tank.upgrade();

      expect(tank.getUpgradeLevel()).toEqual(3);
    });
  });
  
  it("#updateColor", function () {
    var color = new TankColor();
    tank.setColor(color);
    spyOn(color, 'update');
    tank.updateColor();
    expect(color.update).toHaveBeenCalled();
  });
});

describe("Tank", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(tank, [
      Bullet.Event.DESTROYED,
      CollisionDetector.Event.COLLISION,
      CollisionDetector.Event.OUT_OF_BOUNDS,
      TankStateAppearing.Event.END,
      TankStateInvincible.Event.END]);
  });
  
  it("should fire an event when created", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var tank = new Tank(eventManager);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Tank.Event.CREATED, 'tank': tank});
  });
});
