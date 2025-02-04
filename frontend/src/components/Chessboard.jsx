import React from 'react'
const MOVE = "move"

const Chessboard = ({socket, position, board, setBoard}) => {
    const [from, setFrom] = React.useState(null)
    const [to, setTo] = React.useState(null)
    const [render, setRender] = React.useState(false)
    const checkMove =  (i, j)=>{
        console.log(i, j)
        if(!from && !position[i][j])return;
        if(!from){
            setFrom(String.fromCharCode('a'.charCodeAt(0)+j)+''+(8-i))
        }
        else {
            try{
                setRender(!render)
                socket.send(JSON.stringify({type: MOVE, move: {from: from, to: String.fromCharCode('a'.charCodeAt(0)+j)+''+(8-i)}}))
                setTo(null)
                setFrom(null)
            }
            catch (e) {
                return;
            }
        }
    }
  return (
    <div>
        {position.map((row, i) => {
            return (
                <div className='flex justify-center' key={i}>
                    {row.map((square, j) => {
                        return (
                            <div key={j} onClick={()=>{checkMove(i,j)}} className={`w-12 h-12 flex justify-center items-center ${((i+j)%2==0)?'bg-blue-500':'bg-white'}`}>
                                {square ? square.type + square.color : ''}
                            </div>
                        )
                        
                    })}
                </div>
            )
        })
        }
    </div>
  )
}

export default Chessboard