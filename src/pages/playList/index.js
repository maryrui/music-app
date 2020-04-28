import React,{Component} from 'react'

import Nav from '../../components/Nav'
import { getPlaylistDetail } from '../../api'
import { createPlayListDetail } from '../../model/index'

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
    _getPlayDetail(){
        getPlaylistDetail(this.props.match.params.id).then(res=>{
            if(res.data.code === 200){
                this.setState({
                    data:createPlayListDetail(res.data.playlist)
                })
                console.log(this.state.data)
            }
        })
    }

    render(){
        const {
            name,
            coverImgUrl
        } = this.state.data
        return (
            <div>
                <Nav title={name ?  name : this.state.defaultName}></Nav>
                <div className='minNav img-blur'>
                    <div style={{backgroundImage:`url(${coverImgUrl})`}} className='img-blur'></div>
                </div>
                <div className='container'>
                    <div className='playListHeader'>
                        <div style={{backgroundImage:`url(${coverImgUrl})`}} className='img-blur'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayList
