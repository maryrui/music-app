import React, {Component} from 'react'
import Nav from '../../components/Nav'
import ColumnList from '../../components/ColumnList'
import Scroll from '../../components/Scroll'
import {formatPlayList} from '../../model/index'
import { getTopPlaylist } from '../../api'
import './index.scss'




class SheetList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            page:0,
            loading:false,
            options:{
                pullUpLoad:true,
                probeType:2
            }
        }
    }
    componentDidMount() {
        this._getPlayList()
    }
    // 上拉加载
    pullUpLoad = () => {
        // console.log('上拉');
        this.setState({
            loading: true
        })
        this._getPlayList()
    }
    _getPlayList(){
        getTopPlaylist(this.state.page).then(res=>{
            if(res.data.code === 200){
                let data=this.state.data
                let page = this.state.page+1
                this.setState({
                    data:data.concat(formatPlayList(res.data.playlists)),
                    page:page
                })
            }
        })
    }

    render(){
        return (
            <div className='sheetBox'>
                <Nav></Nav>
                <Scroll options={this.state.options} pullUpLoad={this.pullUpLoad} className="mm-content">
                    <div className='sheetPlayListBox'>
                        <ColumnList list={this.state.data} onclickItem={id=>this.props.history.push('/playList/'+id)}></ColumnList>
                    </div>
                </Scroll>
            </div>
        )
    }
}

export default SheetList
