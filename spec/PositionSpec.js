describe("Position", function () {
  it("should know its coordinates", function () {
    var X = 1, Y = 2;
    var position = new Position(X, Y);
    expect(position.getX()).toEqual(X);
    expect(position.getY()).toEqual(Y);
  });
});
