Function.prototype.subclass = function(base) {
  var c = Function.prototype.subclass.nonconstructor;
  c.prototype = base.prototype;
  this.prototype = new c();
};
Function.prototype.subclass.nonconstructor = function() {};
