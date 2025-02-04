import React, { useState, useEffect } from 'react'
import Chessboard from '../components/Chessboard'
import { useSocket } from '../hooks/useSocket.jsx'
import {Chess} from 'chess.js'

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const CHECKMATE = "checkmate";
export const DRAW = "draw";
export const STALEMATE = "stalemate";

const Game = () => {

    const [board, setBoard] = useState(null)
    const socket = useSocket()
    const onClick = () => {
        socket.send(JSON.stringify({type: INIT_GAME}))
    }
    useEffect(() => {
        if(!socket) return
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if(message.type === INIT_GAME) {
                console.log('Game initialized')
                setBoard(new Chess())
                console.log(board)
            }
            if(message.type === MOVE) {
                console.log('Move received')
                // console.log(JSON.parse(message))
                // let newBoard = board
                // while(!message)
                // {
                //     console.log(1)
                // }
                // newBoard.move(message.move)
                // setBoard(newBoard)
                setBoard((prevBoard) => {
                    const updatedBoard = prevBoard ? new Chess(prevBoard.fen()) : new Chess();
                    updatedBoard.move(message.move);
                    console.log(updatedBoard.ascii())
                    return updatedBoard;
                })
                
            }
            if(message.type === CHECKMATE) {
                console.log('Checkmate')
            }
            if(message.type === DRAW) {
                console.log('Draw')
            }
            if(message.type === STALEMATE) {
                console.log('Stalemate')
            }
        }
    }, [socket, board])


  if(!socket) return <div>Connecting...</div>
  return (
    <div className='mt-3 justify-center flex'>
        <div className='pt-8 max-w-screen-lg w-full'>
            <div className='grid grid-cols-6 gap-4 w-full'>
                <div className='col-span-5 w-full bg-red-200'>
                    {board &&<Chessboard board={board} socket={socket} setBoard={setBoard} position={board.board()}/>}
                </div>
                <div className='col-span-1 w-full bg-green-200'>
                    <button onClick={onClick}>Play</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Game