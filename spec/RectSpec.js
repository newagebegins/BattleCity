describe("Rect", function () {
  it("default state", function () {
    var rect = new Rect();
    expect(rect.getWidth()).toEqual(1);
    expect(rect.getHeight()).toEqual(1);
  });
  
  describe("#intersects", function () {
    it("test 1", function () {
      var rect1 = new Rect(0, 0, 1, 1);
      var rect2 = new Rect(0, 0, 1, 1);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
    
    it("test 2", function () {
      var rect1 = new Rect(0, 0, 1, 1);
      var rect2 = new Rect(1, 0, 1, 1);
      expect(rect1.intersects(rect2)).toBeFalsy();
    });
    
    it("test 3", function () {
      var rect1 = new Rect(2, 0, 1, 1);
      var rect2 = new Rect(0, 0, 2, 2);
      expect(rect1.intersects(rect2)).toBeFalsy();
    });
    
    it("test 4", function () {
      var rect1 = new Rect(1, 0, 1, 1);
      var rect2 = new Rect(0, 0, 2, 2);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
    
    it("test 5", function () {
      var rect1 = new Rect(0, 0, 4, 4);
      var rect2 = new Rect(2, 2, 4, 4);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
    
    it("test 6", function () {
      var rect1 = new Rect(0, 0, 4, 4);
      var rect2 = new Rect(-2, -2, 4, 4);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
    
    it("test 7", function () {
      var rect1 = new Rect(0, 0, 4, 4);
      var rect2 = new Rect(2, -2, 4, 4);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
    
    it("test 8", function () {
      var rect1 = new Rect(0, 0, 4, 4);
      var rect2 = new Rect(-2, 2, 4, 4);
      expect(rect1.intersects(rect2)).toBeTruthy();
    });
  });
  
  describe("#containsWhole", function () {
    it("test 1", function () {
      var rect1 = new Rect(0, 0, 10, 10);
      var rect2 = new Rect(0, 0, 10, 10);
      expect(rect1.containsWhole(rect2)).toBeTruthy();
    });
    
    it("test 2", function () {
      var rect1 = new Rect(0, 0, 10, 10);
      var rect2 = new Rect(-1, 0, 10, 10);
      expect(rect1.containsWhole(rect2)).toBeFalsy();
    });
    
    it("test 3", function () {
      var rect1 = new Rect(0, 0, 10, 10);
      var rect2 = new Rect(3, 3, 3, 3);
      expect(rect1.containsWhole(rect2)).toBeTruthy();
    });
    
    it("test 3", function () {
      var rect1 = new Rect(0, 0, 10, 10);
      var rect2 = new Rect(8, 3, 3, 3);
      expect(rect1.containsWhole(rect2)).toBeFalsy();
    });
  });
});
