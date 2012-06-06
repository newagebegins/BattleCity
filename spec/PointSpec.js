describe("Point", function () {
  it("default state", function () {
    var point = new Point();
    expect(point.getX()).toEqual(0);
    expect(point.getY()).toEqual(0);
    expect(point.getPosition()).toEqual(new Point(0, 0));
  });
  
  it("should know its coordinates", function () {
    var X = 1, Y = 2;
    var point = new Point(X, Y);
    expect(point.getX()).toEqual(X);
    expect(point.getY()).toEqual(Y);
  });
});
