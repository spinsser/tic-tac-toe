export type TTile = 'x' | 'o' | '';
export type TGameState =  TTile | 'tie' | 'live';

export interface TTicTacToe {
    gameMap: TTile[][];
    turn: TTile;
    mapSize: number;
    gameState: TGameState;

    isLive(): boolean;
    checkGame(x: number, y: number): TGameState;
    play(x: number, y: number): TTicTacToe
}


export class TicTacToe implements TTicTacToe {
    gameMap: TTile[][];
    turn: TTile = 'x';
    mapSize: number = 3;
    gameState: TGameState = 'live';

    constructor({gameMap, turn = 'x', mapSize = 3, gameState = 'live'}: TTicTacToe) {
        this.mapSize = mapSize;
        this.gameState = gameState;
        this.turn = turn;
        this.gameMap = Array(mapSize);
        for(let idx = 0; idx < mapSize; idx++) {
            if(gameMap) {
                this.gameMap[idx] = [... gameMap[idx]];
            } else {
                this.gameMap[idx] = Array(mapSize).fill('');
            }
        }
    }

    isLive() {
        return this.gameState === 'live'; 
    }
    
    checkGame(x: number, y: number): TGameState {
        if(!this.isLive()) {
            return this.gameState
        }
        
        if(x >= this.mapSize || y >= this.mapSize || x < 0 || y < 0 || !Number.isInteger(x), !Number.isInteger(y)) {
            throw Error("Invalid location");
        }

        const tile = this.gameMap[x][y];

        if(tile !== 'x' && tile !== 'o'){
            return 'live';
        }

        let diagonalA = 0;
        let diagonalB = 0;

        if(this.gameMap[x].every((item) => item === tile) || this.gameMap.every((item) => item[y] === tile)) {
            this.gameState = tile;
            return tile;
        }

        if(x === y || x + y === this.mapSize - 1) {
            for(let idx = 0; idx < this.mapSize; idx++) {
                if(this.gameMap[idx][idx] === tile) {
                    diagonalA++;
                }
                if(this.gameMap[idx][this.mapSize - idx - 1] == tile) {
                    diagonalB++;
                }
            }
        }

        if(diagonalA === this.mapSize || diagonalB === this.mapSize) {
            this.gameState = tile;
            return tile;
        }

        if(!this.gameMap.some((row) => row.some((cell) => cell === ''))) {
            this.gameState = 'tie';
            return tile;
        }

        return this.gameState;

    }

    play(x: number, y: number): TicTacToe {
        // console.log({x, y, turn: this.turn, game: this});
        if(!this.isLive()) {
            throw Error('Game already ended!');
        }
        
        if(x >= this.mapSize || y >= this.mapSize || x < 0 || y < 0 || !Number.isInteger(x), !Number.isInteger(y)) {
            throw Error("Invalid location");
        }

        if(this.gameMap[x][y] != '') {
            // throw Error("Can't play in a used tile")
        }

        const nextGame: TTicTacToe = new TicTacToe({... this});

        nextGame.gameMap[x][y] = this.turn;

        nextGame.checkGame(x, y);

        nextGame.turn = this.turn === 'x' ? 'o' : 'x';

        return nextGame;

    }
    
}