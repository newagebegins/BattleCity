var ImageManager = (function() {
  var images = {
    tank_down_1: null,
    tank_down_2: null,
    tank_left_1: null,
    tank_left_2: null,
    tank_right_1: null,
    tank_right_2: null,
    tank_up_1: null,
    tank_up_2: null,
    
    appear_1: null,
    appear_2: null,
    appear_3: null,
    appear_4: null,
    
    shield_1: null,
    shield_2: null,
    
    bullet_up: null,
    bullet_down: null,
    bullet_left: null,
    bullet_right: null,
    
    explosion_1: null,
    explosion_2: null,
    explosion_3: null,
    
    wall_brick: null,
    wall_steel: null,
    
    base: null,
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
