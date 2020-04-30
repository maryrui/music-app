import React,{Component} from 'react'

class Player extends Component{
    constructor(props){
        super(props)
        this.state ={
            isFull :false,  /* 是否全屏 */
            isPlay:false,
            showPlayList:false
        }
    }


    render(){

        return (
            <div className='player'>
                <div >

                </div>
                <div className='player-mini'>

                </div>
            </div>
        )
    }
}

export default  Player