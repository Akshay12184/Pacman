document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');

    let playerPosition = { x: 1, y: 1, z: 0 };
    let ghosts = [
        { x: 14, y: 11, z: 0, class: 'ghost1' },
        { x: 15, y: 11, z: 0, class: 'ghost2' },
        { x: 16, y: 11, z: 0, class: 'ghost3' },
        { x: 17, y: 11, z: 0, class: 'ghost4' }
    ];
    let score = 0;

    // the map layout 
    const grid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // logic for what number means what and rendering the pellets
    const createGrid = () => {
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                if (cell === 1) {
                    cellDiv.classList.add('wall');
                } else if (cell === 0) {
                    cellDiv.classList.add('empty');
                    const random = Math.random();
                    if (random < 0.9) {
                        cellDiv.classList.add('small-pellet');
                    } else if (random < 1.0) {
                        cellDiv.classList.add('power-pellet');
                    }
                    else {
                        (random < 0.7)
                        cellDiv.classList.add('berry-pellet')
                    }
                }
                gridContainer.appendChild(cellDiv);

                if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
                    cellDiv.classList.add('player');
                    cellDiv.style.zIndex = playerPosition.z;
                }

                ghosts.forEach(ghost => {
                    if (rowIndex === ghost.y && colIndex === ghost.x) {
                        cellDiv.classList.add('ghost', ghost.class);
                        cellDiv.style.zIndex = ghost.z;
                    }
                });
            });
        });
    };

    // rendering pacmam, ghosts and score 
    const renderPlayer = () => {
        gridContainer.querySelectorAll('.player').forEach(cell => {
            cell.classList.remove('player');
        });

        const playerCell = gridContainer.querySelector(`.grid div:nth-child(${playerPosition.y * grid[0].length + playerPosition.x + 1})`);
        if (playerCell.classList.contains('small-pellet')) {
            score += 10;
            playerCell.classList.remove('small-pellet');
        } else if (playerCell.classList.contains('power-pellet')) {
            score += 50;
            playerCell.classList.remove('power-pellet');
        }

        playerCell.classList.add('player');
        playerCell.style.zIndex = playerPosition.z;

        scoreDisplay.innerText = `Score: ${score}`;
    };


    const renderGhosts = () => {
        gridContainer.querySelectorAll('.ghost').forEach(cell => {
            cell.classList.remove('ghost', 'ghost1', 'ghost2', 'ghost3', 'ghost4');
        });

        ghosts.forEach(ghost => {
            const ghostCell = gridContainer.querySelector(`.grid div:nth-child(${ghost.y * grid[0].length + ghost.x + 1})`);
            ghostCell.classList.add('ghost', ghost.class);
            ghostCell.style.zIndex = ghost.z;
        });
    };


    // calculating the movements for player and the ghosts 
    const calculateNewZIndex = () => {
        return playerPosition.z;
    };

    const movePlayer = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (isValidMove(newX, newY)) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            playerPosition.z = calculateNewZIndex();
            renderPlayer();
        } else {
            console.log(`Cannot move to: (${newX}, ${newY})`);
        }
    };

    const isValidMove = (x, y) => {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] !== 1;
    };

    const moveGhosts = () => {
        ghosts.forEach(ghost => {
            const possibleMoves = [
                { x: 0, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ];

            let validMoves = possibleMoves.filter(move => {
                const newX = ghost.x + move.x;
                const newY = ghost.y + move.y;
                return isValidMove(newX, newY);
            });

            if (validMoves.length > 0) {
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                ghost.x += randomMove.x;
                ghost.y += randomMove.y;
            }
        });

        renderGhosts();
    };

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
                movePlayer(0, -1);
                break;
            case 'a':
                movePlayer(-1, 0);
                break;
            case 's':
                movePlayer(0, 1);
                break;
            case 'd':
                movePlayer(1, 0);
                break;
            default:
                break;
        }
    });

    createGrid();
    renderPlayer();
    renderGhosts();

    setInterval(moveGhosts, 500);
});

//ToDo: 
// when pacman hits enemy after eaten powerpellet spawn back into the start spawn with an delay on moving for 3 seconds 