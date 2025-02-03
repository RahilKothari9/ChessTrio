import { Game } from './Game.js'
import { INIT_GAME, MOVE } from './messages.js';
export class GameManager {
    games;
    pendingUser;
    users;

    constructor() {
        this.games=[];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket) {
        this.users.push(socket)
        this.addHandler(socket)
    }

    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket)
        this.games = this.games.filter(game => game.player1 !== socket && game.player2 !== socket)
    }

    

    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString())

            if(message.type === INIT_GAME) {
                if(this.pendingUser) {
                    const game = new Game(this.pendingUser, socket)
                    this.games.push(game)
                    this.pendingUser = null
                }
                else {
                    this.pendingUser = socket
                }
            }

            if(message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                game.makeMove(socket, message.move)
            }
        })
    }
}