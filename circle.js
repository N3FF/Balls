function Circle(game) {
    var letters = '0123456789ABCDEF';
    var colors = '#';
    for (var i = 0; i < 6; i++) {
        colors += letters[Math.floor(Math.random() * 16)];
    }
    this.enableCollision = true; // Enable & Disable Collision.
    this.game = game;
    this.color = colors;
    this.radius = 20;
    this.startVelocity = 25;
    this.gravity = Math.random() * (0.87-0.95) + 0.95;
    this.velocity = { 
        x: Math.random() * this.startVelocity/2 - this.startVelocity/4, 
        y: Math.random() * this.startVelocity - this.startVelocity/2 
    };
    this.x = this.radius + Math.random() * (canvasDimensions.width - this.radius);
    this.y = this.radius + Math.random() * (canvasDimensions.height/2 - this.radius);
};

// Collided with another circle
Circle.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

//Collision with the edge of the canvas
Circle.prototype.wrapX = function () {
    if (this.x > canvasDimensions.width) {
        this.x = this.x - canvasDimensions.width;
    } else if (this.x < 0) {
        this.x = this.x + canvasDimensions.width;
    }
};

Circle.prototype.update = function () {
    this.wrapX(); //if object goes off screen wrap to the other side
    if (this.enableCollision) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && this.collide(ent)) {
                var temp = { x: this.velocity.x, y: this.velocity.y };

                var dist = distance(this, ent);
                var delta = this.radius + ent.radius - dist;
                var difX = (this.x - ent.x) / dist;
                var difY = (this.y - ent.y) / dist;

                this.x += difX * delta / 2;
                this.y += difY * delta / 2;
                ent.x -= difX * delta / 2;
                ent.y -= difY * delta / 2;

                this.velocity.x = ent.velocity.x;
                this.velocity.y = ent.velocity.y;
                ent.velocity.x = temp.x;
                ent.velocity.y = temp.y;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                ent.x += ent.velocity.x;
                ent.y += ent.velocity.y;
            }
        }
    }
    if (this.y > canvasDimensions.height - this.radius) {
        this.y = canvasDimensions.height - this.radius;
        // try and eliminate jitter and microcalculations
        if (this.velocity.y < this.radius/2 && this.velocity.y > -this.radius/2) { 
            this.velocity.y = 0;
            if (this.velocity.x < 0.1 && this.velocity.x > -0.1) {
                this.velocity.x = 0;
            } else {
                this.velocity.x *= 0.95;
            }
        } else {
            this.velocity.y = -this.velocity.y * this.gravity;
        }
    } else {
        this.velocity.y += 0.5;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Circle.prototype.draw = function () {
    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
};