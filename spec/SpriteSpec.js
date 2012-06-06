describe("Sprite", function () {
  describe("initial state", function () {
    var sprite;
    
    beforeEach(function () {
      sprite = new Sprite();
    });
    
    it("direction should be Right", function () {
      expect(sprite.getDirection()).toEqual(Sprite.Direction.RIGHT);
    });
    
    it("speed should be 0", function () {
      expect(sprite.getSpeed()).toEqual(0);
    });
  });
});
