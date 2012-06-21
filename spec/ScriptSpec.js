describe("Script", function () {
  var MockAction = function (script, numUpdates) {
    this._script = script;
    this._numUpdates = numUpdates;
    
    this.update = function () {
      this._numUpdates--;
      if (this._numUpdates == 0) {
        this._script.actionCompleted();
      }
    };
  };
  
  it("#update", function () {
    var script = new Script();
    
    var commandOne = jasmine.createSpyObj('commandOne', ['execute']);
    var commandTwo = jasmine.createSpyObj('commandTwo', ['execute']);
    var actionOne = new MockAction(script, 2);
    var actionTwo = new MockAction(script, 1);
    
    spyOn(actionOne, 'update').andCallThrough();
    spyOn(actionTwo, 'update').andCallThrough();
    
    script.enqueue(commandOne);
    script.enqueue(commandTwo);
    script.enqueue(actionOne);
    script.enqueue(actionTwo);
    
    script.update();
    
    expect(commandOne.execute).toHaveBeenCalled();
    expect(commandTwo.execute).toHaveBeenCalled();
    expect(actionOne.update).toHaveBeenCalled();
    expect(actionTwo.update).not.toHaveBeenCalled();
    
    commandOne.execute.reset();
    commandTwo.execute.reset();
    actionOne.update.reset();
    actionTwo.update.reset();
    
    script.update();
    
    expect(commandOne.execute).not.toHaveBeenCalled();
    expect(commandTwo.execute).not.toHaveBeenCalled();
    expect(actionOne.update).toHaveBeenCalled();
    expect(actionTwo.update).not.toHaveBeenCalled();
    
    commandOne.execute.reset();
    commandTwo.execute.reset();
    actionOne.update.reset();
    actionTwo.update.reset();
    
    script.update();
    
    expect(commandOne.execute).not.toHaveBeenCalled();
    expect(commandTwo.execute).not.toHaveBeenCalled();
    expect(actionOne.update).not.toHaveBeenCalled();
    expect(actionTwo.update).toHaveBeenCalled();
    
    script.update();
  });
});
