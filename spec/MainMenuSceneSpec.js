describe("MainMenuScene", function () {
  it("subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var scene = new MainMenuScene(new SceneManager(eventManager));
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(scene, [Keyboard.Event.KEY_PRESSED]);
  });
  
  describe("#notify", function () {
    describe("Keyboard.Event.KEY_PRESSED", function () {
      it("Keyboard.Key.START", function () {
        var eventManager = new EventManager();
        var scene = new MainMenuScene(new SceneManager(eventManager), eventManager);
        spyOn(scene, 'keyPressed');
        scene.notify({'name': Keyboard.Event.KEY_PRESSED, 'key': Keyboard.Key.START});
        expect(scene.keyPressed).toHaveBeenCalledWith(Keyboard.Key.START);
      });
    });
  });
  
  describe("#keyPressed", function () {
    it("Keyboard.Key.START", function () {
      checkKey(Keyboard.Key.START);
    });
    
    it("Keyboard.Key.SELECT", function () {
      checkKey(Keyboard.Key.SELECT);
    });
    
    function checkKey(key) {
      var scene = new MainMenuScene(new SceneManager(new EventManager()));
      spyOn(scene, 'arrived');
      scene.keyPressed(key);
      expect(scene.arrived).toHaveBeenCalled();
    }
  });
  
  describe("#updatePosition", function () {
    it("speed - 1", function () {
      var scene = new MainMenuScene(new SceneManager(new EventManager()));
      scene.setSpeed(1);
      scene.setY(2);
      expect(scene.getY()).toEqual(2);
      scene.updatePosition();
      expect(scene.getY()).toEqual(1);
      scene.updatePosition();
      expect(scene.getY()).toEqual(0);
      scene.updatePosition();
      expect(scene.getY()).toEqual(0);
    });
    
    it("speed - 2", function () {
      var scene = new MainMenuScene(new SceneManager(new EventManager()));
      scene.setSpeed(2);
      scene.setY(6);
      expect(scene.getY()).toEqual(6);
      scene.updatePosition();
      expect(scene.getY()).toEqual(4);
      scene.updatePosition();
      expect(scene.getY()).toEqual(2);
    });
    
    it("arrived", function () {
      var scene = new MainMenuScene(new SceneManager(new EventManager()));
      spyOn(scene, 'arrived');
      scene.setSpeed(1);
      scene.setY(2);
      scene.updatePosition();
      expect(scene.arrived).not.toHaveBeenCalled();
      scene.updatePosition();
      expect(scene.arrived).toHaveBeenCalled();
      scene.arrived.reset();
      scene.updatePosition();
      expect(scene.arrived).not.toHaveBeenCalled();
    });
    
    it("main menu controller activate", function () {
      var eventManager = new EventManager();
      var scene = new MainMenuScene(new SceneManager(eventManager));
      
      var mainMenu = new MainMenu();
      var mainMenuController = new MainMenuController(eventManager, mainMenu);
      spyOn(mainMenuController, 'activate');
      scene.setMainMenuController(mainMenuController);
      
      scene.setSpeed(1);
      scene.setY(1);
      scene.updatePosition();
      expect(mainMenuController.activate).not.toHaveBeenCalled();
      scene.updatePosition();
      expect(mainMenuController.activate).toHaveBeenCalled();
    });
  });
  
  it("#arrived", function () {
    var eventManager = new EventManager();
    var scene = new MainMenuScene(new SceneManager(eventManager));
    scene.setY(1);
    
    var cursor = new MainMenuCursor();
    spyOn(cursor, 'makeVisible');
    scene.setCursor(cursor);
    
    scene.arrived();
    
    expect(scene.getY()).toEqual(0);
    expect(cursor.makeVisible).toHaveBeenCalled();
  });
  
  it("#update", function () {
    var scene = new MainMenuScene(new SceneManager(new EventManager()));
    var cursor = new MainMenuCursor();
    spyOn(cursor, 'update');
    scene.setCursor(cursor);
    spyOn(scene, 'updatePosition');
    scene.update();
    expect(scene.updatePosition).toHaveBeenCalled();
    expect(cursor.update).toHaveBeenCalled();
  });
});
