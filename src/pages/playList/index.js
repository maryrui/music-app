import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../../components/Nav'
import {setAllPlay} from "../../store/actions"
import {connect} from 'react-redux'
import { getPlaylistDetail } from '../../api'
import { createPlayListDetail } from '../../model/index'
import Scroll  from '../../components/Scroll'
import {formatPlayCount} from '../../utils/index'
import SongList from '../../components/songList'
import './index.scss'
const defaultName = '歌单'


class PlayList extends Component {
    constructor(props){
        super(props)
        this.state ={
            data:{},
            defaultName
        }
    }

    componentDidMount() {
        this._getPlayDetail()
    }

    itemClick=(id,index)=>{
        this.props.setAllPlay ({
            playList:this.state.data.tracks,
            currentIndex:index
        })
    }


    _getPlayDetail(){
        getPlaylistDetail(this.props.match.params.id).then(res=>{
            if(res.data.code === 200){
                this.setState({
                    data:createPlayListDetail(res.data.playlist)
                })
            }
        })
    }

    render(){
        const {
            name,
            coverImgUrl,
            playCount,
            tracks
        } = this.state.data
        return (
            <div className='playlist'>
                <Nav title={name ?  name : this.state.defaultName}></Nav>
                <div className='minNav'>
                    <div style={{backgroundImage:`url(${coverImgUrl})`}} className='img-blur'></div>
                </div>
                <Scroll className='y-content'>
                    <div className='container'>
                        <div className='playListHeader'>
                            <div style={{backgroundImage:`url(${coverImgUrl})`}} className='img-blur blur-min'></div>
                            <div className='headContent'>
                                <div>
                                    <p><i className='iconfont'>&#xe602;</i>{formatPlayCount(playCount)}</p>
                                    <img src={coverImgUrl} alt=""/>
                                </div>
                                <div>
                                    <h2>{name}</h2>
                                    <p>
                                        <i className='iconfont'>&#xe616;</i>
                                        <span>霸气姚云音乐</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {tracks && tracks.length > 0 && (
                        <SongList list={tracks} itemClick={this.itemClick}></SongList>
                        )}
                    </div>
                </Scroll>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    showPlayer:state.showPlayer,
    currentMusic:state.currentMusic
})

const mapDispatchToProps = dispatch => ({
    setAllPlay:status=>{
        dispatch(setAllPlay(status))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PlayList))
