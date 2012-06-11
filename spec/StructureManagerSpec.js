describe("StructureManager", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var structureManager = new StructureManager(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(structureManager,
      [Builder.Event.STRUCTURE_CREATED]);
  });
});
