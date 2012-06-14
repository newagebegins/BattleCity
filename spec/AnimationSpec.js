describe("Animation", function () {
  it("no loop", function () {
    var animation = new Animation([1,2]);
    expect(animation.getFrame()).toEqual(1);
    expect(animation.isCompleted()).toBeFalsy();
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    expect(animation.isCompleted()).toBeFalsy();
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    expect(animation.isCompleted()).toBeTruthy();
  });
  
  it("loop", function () {
    var animation = new Animation([1,2], 1, true);
    expect(animation.getFrame()).toEqual(1);
    expect(animation.isCompleted()).toBeFalsy();
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    expect(animation.isCompleted()).toBeFalsy();
    animation.update();
    expect(animation.getFrame()).toEqual(1);
    expect(animation.isCompleted()).toBeFalsy();
  });
  
  it("duration", function () {
    var animation = new Animation([1,2], 2);
    expect(animation.getFrame()).toEqual(1);
    animation.update();
    expect(animation.getFrame()).toEqual(1);
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    expect(animation.isCompleted()).toBeFalsy();
    animation.update();
    expect(animation.getFrame()).toEqual(2);
    expect(animation.isCompleted()).toBeTruthy();
  });
});
