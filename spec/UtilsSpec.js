describe("arrayContains", function () {
  it("should tell if an array contains an object", function () {
    var object1 = {field: 'value'};
    var object2 = {field2: 'value2'};
    var object3 = {field: 'value'};
    var a = [1, 'b', 3, object1];
    
    expect(arrayContains(a, 1)).toBeTruthy();
    expect(arrayContains(a, 'b')).toBeTruthy();
    expect(arrayContains(a, object1)).toBeTruthy();
    
    expect(arrayContains(a, 2)).toBeFalsy();
    expect(arrayContains(a, object2)).toBeFalsy();
    expect(arrayContains(a, object3)).toBeFalsy();
    expect(arrayContains(a, 'c')).toBeFalsy();
  });
});

describe("arrayRemove", function () {
  it("should remove an object from an array", function () {
    var object1 = {field: 'value'};
    var a = [1, 'b', 3, object1];
    
    arrayRemove(a, object1);
    expect(a).toEqual([1, 'b', 3]);
    arrayRemove(a, 'b');
    expect(a).toEqual([1, 3]);
  });
});

describe("String", function () {
  it("#lpad", function () {
    expect("1".lpad(" ", 2)).toEqual(" 1");
  });
});
