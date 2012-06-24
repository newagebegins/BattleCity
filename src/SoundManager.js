var SoundManager = (function() {
  var sounds = {
    stage_start: null,
    game_over: null,
  };
  
  for (var i in sounds) {
    var snd = new Audio("sound/" + i + ".ogg");
    sounds[i] = snd;
  }
  
  return {
    play: function (sound) {
      sounds[sound].play();
    },
    
    notify: function (event) {
    },
  };
})();
