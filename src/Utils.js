Function.prototype.subclass = function(base) {
  var c = Function.prototype.subclass.nonconstructor;
  c.prototype = base.prototype;
  this.prototype = new c();
};
Function.prototype.subclass.nonconstructor = function() {};

// Get the size of an object
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function arrayContains(arr, obj) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
};

function arrayRemove(arr, obj) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) {
      arr.splice(i, 1);
    }
  }
}

function arrayRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

String.prototype.lpad = function(padString, length) {
  var str = this;
  while (str.length < length)
    str = padString + str;
  return str;
}
