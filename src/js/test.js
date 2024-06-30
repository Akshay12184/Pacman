class Ghost {
    constructor(name, color, speed, startPosition, behavior) {
        this.name = name;
        this.color = color;
        this.speed = speed;
        this.position = startPosition;
        this.behavior = behavior; 
        this.direction = 'left';
    }
}