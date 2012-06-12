describe("Base", function () {
  it("#getClassName", function () {
    var eventManager = new EventManager();
    var base = new Base(eventManager);
    expect(base.getClassName()).toEqual('Base');
  });
});
