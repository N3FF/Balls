
// GameBoard code below

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// the "main" code begins here
var canvasDimensions = {
    width: 0,
    height: 0
}

var init = function(){
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    canvasDimensions.width = canvas.width;
    canvasDimensions.height = canvas.height;
    var gameEngine = new GameEngine();
    for (var i = 0; i < 25; i++) {
        circle = new Circle(gameEngine);
        gameEngine.addEntity(circle);
    }
    gameEngine.init(ctx);
    gameEngine.start();
}
window.onload = init;
window.addEventListener('resize', function(e){
    var canvas = document.getElementById('gameWorld');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasDimensions.width = canvas.width;
    canvasDimensions.height = canvas.height;
});
