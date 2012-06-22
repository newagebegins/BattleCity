describe("MoveFn", function () {
  describe("#update", function () {
    describe("positive increment", function () {
      it("step - 1", function () {
        var obj = {x: 0};
        var listener = jasmine.createSpyObj('listener', ['actionCompleted']);
        var moveFn = new MoveFn(obj, 'x', 3, 3, listener);

        expect(obj.x).toEqual(0);

        moveFn.update();
        expect(obj.x).toEqual(1);
        expect(listener.actionCompleted).not.toHaveBeenCalled();

        moveFn.update();
        expect(obj.x).toEqual(2);
        expect(listener.actionCompleted).not.toHaveBeenCalled();

        moveFn.update();
        expect(obj.x).toEqual(3);
        expect(listener.actionCompleted).toHaveBeenCalled();
        listener.actionCompleted.reset();

        moveFn.update();
        expect(obj.x).toEqual(3);
        expect(listener.actionCompleted).not.toHaveBeenCalled();
      });
      
      it("step - 2", function () {
        var obj = {x: 0};
        var listener = jasmine.createSpyObj('listener', ['actionCompleted']);
        var moveFn = new MoveFn(obj, 'x', 3, 2, listener);

        expect(obj.x).toEqual(0);

        moveFn.update();
        expect(obj.x).toEqual(1.5);
        expect(listener.actionCompleted).not.toHaveBeenCalled();

        moveFn.update();
        expect(obj.x).toEqual(3);
        expect(listener.actionCompleted).toHaveBeenCalled();
        listener.actionCompleted.reset();

        moveFn.update();
        expect(obj.x).toEqual(3);
        expect(listener.actionCompleted).not.toHaveBeenCalled();
      });

      it("step - 3", function () {
        var obj = {x: 0};
        var listener = jasmine.createSpyObj('listener', ['actionCompleted']);
        var moveFn = new MoveFn(obj, 'x', 3, 1, listener);

        expect(obj.x).toEqual(0);

        moveFn.update();
        expect(obj.x).toEqual(3);
        expect(listener.actionCompleted).toHaveBeenCalled();
      });
    });
    
    describe("negative increment", function () {
      it("step - 1", function () {
        var obj = {x: 3};
        var listener = jasmine.createSpyObj('listener', ['actionCompleted']);
        var moveFn = new MoveFn(obj, 'x', 0, 3, listener);

        expect(obj.x).toEqual(3);

        moveFn.update();
        expect(obj.x).toEqual(2);
        expect(listener.actionCompleted).not.toHaveBeenCalled();

        moveFn.update();
        expect(obj.x).toEqual(1);
        expect(listener.actionCompleted).not.toHaveBeenCalled();

        moveFn.update();
        expect(obj.x).toEqual(0);
        expect(listener.actionCompleted).toHaveBeenCalled();
        listener.actionCompleted.reset();

        moveFn.update();
        expect(obj.x).toEqual(0);
        expect(listener.actionCompleted).not.toHaveBeenCalled();
      });

      it("step - 3", function () {
        var obj = {x: 3};
        var listener = jasmine.createSpyObj('listener', ['actionCompleted']);
        var moveFn = new MoveFn(obj, 'x', 0, 1, listener);

        expect(obj.x).toEqual(3);

        moveFn.update();
        expect(obj.x).toEqual(0);
        expect(listener.actionCompleted).toHaveBeenCalled();
      });
    });
  });
});
