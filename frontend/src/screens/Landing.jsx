import React from 'react'
import { Link } from 'react-router'

const Landing = () => {
  return (
    <div className='mt-3'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex justify-center'>
                <img src='/chessboard.jpg' className='max-w-96'></img>
            </div>
            <div className=''>
                <h1 className='text-3xl font-bold'>Chess</h1>
                <div className='mt-3 '>
                    <button 
                    className='bg-blue-500 hover:bg-blue-700 
                    text-white font-bold py-2 px-4 rounded'>
                        <Link to='/game'>Play</Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing