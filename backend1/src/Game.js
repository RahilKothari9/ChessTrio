import { Chess } from 'chess.js'
import { CHECKMATE, DRAW, STALEMATE, MOVE, INIT_GAME } from './messages.js';
export class Game {
    player1;
    player2;
    board
    moves
    startTime
    turn
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.turn = player1
        this.board = new Chess();
        this.moves = this.board.moves();
        this.startTime = new Date();
        this.turn = player1

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            color: 'white'
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            color: 'black'
        }))
    }

    makeMove(player, move) {
        if(player !== this.turn) {
            return
        }
        try {
            this.board.move(move)
        }
        catch (e) {
            console.log(move)
            console.log(e)
            return
        }
        this.turn = this.turn === this.player1 ? this.player2 : this.player1

        if(this.board.isCheckmate()) {
            this.player1.send(JSON.stringify({
                type: CHECKMATE,
                winner: this.turn === this.player1 ? this.player2 : this.player1
            }))
            this.player2.send(JSON.stringify({
                type: CHECKMATE,
                winner: this.turn === this.player1 ? this.player2 : this.player1
            }))
        }

        if(this.board.isDraw() || this.board.isThreefoldRepetition() ) {
            this.player1.send(JSON.stringify({
                type: DRAW,
                winner: null
            }))
            this.player2.send(JSON.stringify({
                type: DRAW,
                winner: null
            }))
        }

        if(this.board.isStalemate()) {
            this.player1.send(JSON.stringify({
                type: STALEMATE,
                winner: null
            }))
            this.player2.send(JSON.stringify({
                type: STALEMATE,
                winner: null
            }))
        }
        // console.log(this.turn)
        console.log(move)
        console.log(this.moves)
        console.log(this.board.ascii())
        console.log(this.board.history())
       
            this.player2.send(JSON.stringify({
                type: MOVE,
                move: move
            }))
        
            this.player1.send(JSON.stringify({
                type: MOVE,
                move: move
            }))
    }
}