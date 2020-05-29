import React,{Component} from 'react'
import ReactDom from 'react-dom'
import {connect} from 'react-redux'
import './index.scss'
import Cd from './Cd'
import Progress from '../Progress'
import classNames from 'classnames'
import {formatTime} from '../../utils/index'
import {setCurrentMusic, setShowPlayer,setCurrentIndex,setPlayList} from "../../store/actions";
class Player extends Component{
    constructor(props){
        super(props)
        this.state ={
            isFull :false,  /* 是否全屏 */
            isPlay:false,
            showPlayList:false,
            currentTime:0,
            currentMusic: {
                id: 368727,
                name: '明天，你好',
                singer: '牛奶咖啡',
                album: 'Lost & Found 去寻找',
                image:
                    'http://p1.music.126.net/LQ2iUKlZwqGMysGkeCR4ww==/27487790697969.jpg',
                duration: 271,
                url: 'https://music.163.com/song/media/outer/url?id=368727.mp3'
            }
        }
    }

    componentDidMount(){
        this.music = ReactDom.findDOMNode(this.refs.audioEle)
        this.music.load()
        this.bindEvents()
    }

    componentWillUnmount() {
        this.unbindEvents()
    }

    bindEvents(){
        this.music.addEventListener('canplay',this.readyPlay)
        this.music.addEventListener('ended',this.next)
        this.music.addEventListener('timeupdate',this.timeUpdate)
    }

    unbindEvents(){
        this.music.removeEventListener('canplay',this.readyPlay)
        this.music.removeEventListener('ended',this.next)
        this.music.removeEventListener('timeupdate',this.timeUpdate)
    }

    readyPlay=()=>{
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.music.play()
            this.setState({
                isPlay:true
            })
        },0)
    }

    timeUpdate=()=>{
        this.setState({
            currentTime:this.music.currentTime
        })
    }

    playClick=()=>{
        this.setState({
            isPlay:!this.state.isPlay
        })
    }

    prev= e=>{
        let index = this.props.currentIndex - 1
        if(index < 0){
            index = this.props.playList.length-1
        }
        this.props.setCurrentIndex(index)
        this.props.setCurrentMusic(this.props.playList[index])

    }

    next = e=>{
        let index = this.props.currentIndex + 1
        if(index === this.props.playList.length){
            index = 0
        }
        this.props.setCurrentIndex(index)
        this.props.setCurrentMusic(this.props.playList[index])
    }

    /* 播放 */
    play= e=>{
        if(this.state.isPlay){
            this.music.pause()
            this.setState({
                isPlay:false
            })
        }else{
            this.music.play()
            this.setState({
                isPlay:true
            })
        }
        e.stopPropagation()
    }

    /* 进度条 */
    progressEnd=value=>{
        this.music.currentTime=value*this.props.currentMusic.duration
    }

    render(){
        const {isPlay,isFull,currentTime}= this.state
        const {currentMusic,playList} = this.props
        return (
            <div className='player'>
                <div className='fullPlayer' style={{display:isFull ? 'block' : 'none'}}>
                    <div className='bg' style={{backgroundImage:`url('${currentMusic.image}?param=200y200')`}}>
                    </div>
                    <div className='player-header'>
                        <i className='iconfont' onClick={()=>{this.setState({isFull:false})}}>&#xe937;</i>
                        <div>
                            <p>{currentMusic.name}</p>
                            <span>{currentMusic.singer}</span>
                        </div>
                    </div>
                    <div className='player-middle'>
                        <Cd isPlay={isPlay} image={currentMusic.image}></Cd>
                    </div>
                    <div className='player-footer'>
                        <div className='progress-box'>
                            <span>{formatTime(currentTime)}</span>
                            <Progress percent={currentTime/currentMusic.duration} drawEd={this.progressEnd}></Progress>
                            <span>{formatTime(currentMusic.duration)}</span>
                        </div>
                        <div className='player-bar'>
                            <p onClick={this.prev}><i className='iconfont'>&#xe603;</i></p>
                            <p onClick={this.play}><i className={classNames('iconfont',{'isHidden':!isPlay})}>&#xe669;</i><i  className={classNames('iconfont',{'isHidden':isPlay})}>&#xe630;</i></p>
                            <p onClick={this.next}><i className='iconfont'>&#xe604;</i></p>
                            <p><i className='iconfont'>&#xe634;</i></p>
                        </div>
                    </div>
                </div>
                <div className='player-mini' onClick={()=>{this.setState({isFull:true})}}>
                    <p>
                        <img src={currentMusic.image} alt=""/>
                    </p>
                    <div>
                        <h2 className='text-orient'>{currentMusic.name}</h2>
                        <span className='text-orient'>{currentMusic.singer}</span>
                    </div>
                    <p onClick={this.play}><i className={classNames('iconfont',{'isHidden':!isPlay})}>&#xe669;</i><i  className={classNames('iconfont',{'isHidden':isPlay})}>&#xe630;</i></p>
                    <p><i className='iconfont'>&#xe634;</i></p>
                </div>
                <audio
                    ref="audioEle"
                    src={`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`}
                ></audio>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    currentMusic:state.currentMusic,
    currentIndex:state.currentIndex,
    playList:state.playList
})

const mapDispatchToProps= dispatch => ({
    setShowPlayer : status => {
        dispatch(setShowPlayer(status))
    },
    setCurrentMusic : status => {
        dispatch(setCurrentMusic(status))
    },
    setCurrentIndex : status => {
        dispatch(setCurrentIndex(status))
    },
    setPlayList : status => {
        dispatch(setPlayList(status))
    }
})



export default  connect(mapStateToProps,mapDispatchToProps)(Player)