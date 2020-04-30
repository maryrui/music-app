import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'


const SongList = props=> {
    const { list,showBank,onItemClick,activeId } = props
    return (
        <div className='song-wrapper'>
            {
                list.length > 0 &&
                list.map((item,index)=>(
                    <div className='songItem' key={item.id}>
                        <span>{index+1}</span>
                        <div>
                            <p>{item.name}</p>
                            <span>{item.singer}&nbsp;-&nbsp;{item.album}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

SongList.Prototypes = {
    list:PropTypes.any.isRequired
}

export default SongList