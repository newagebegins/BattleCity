describe("Random", function () {
  it("#getNumber", function () {
    var random = new Random();
    var number = random.getNumber();
    expect(typeof(number)).toEqual('number');
    expect(number >= 0 && number < 1).toBeTruthy();
  });
});
