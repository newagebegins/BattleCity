var ImageManager = (function() {
  var images = {
    tank_down_1: null,
    tank_down_2: null,
    tank_left_1: null,
    tank_left_2: null,
    tank_right_1: null,
    tank_right_2: null,
    tank_up_1: null,
    tank_up_2: null
  };
  
  for (var i in images) {
    var img = new Image();
    img.src = 'images/' + i + '.png';
    images[i] = img;
  }
  
  return {
    getImage: function (name) {
      return images[name];
    }
  };
})();
