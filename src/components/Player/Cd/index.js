import React from 'react'
import classNames from 'classnames'
import './index.scss'
const Cd = props=>{
    const {isPlay,image} = props
    return (
        <div className={classNames('player-cd',{pause: !isPlay})}>
            <div className='needle'>

            </div>
            <div className='disc-box'>
                <img src={image} alt=""/>
            </div>
        </div>
    )
}

export default Cd