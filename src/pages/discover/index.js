import React,{Component} from 'react'

import Slide from "../../components/slide"
import ColumnList from "../../components/ColumnList"
import {formatPlayListMin} from '../../model/index'
import './index.scss'

import {getBanner,getPersonalized} from "../../api"

class Discover extends Component{

    constructor(props){
        super(props)
        this.state = {
            bannerList:[],
            personalized:[]
        }
    }

    componentDidMount(){
        getPersonalized().then(res=>{
            if(res.data.code === 200){
                this.setState({
                    personalized:formatPlayListMin(res.data.result)
                })
            }
        })
        getBanner().then(res=>{
            if(res.data.code === 200) {
                this.setState({
                    bannerList: res.data.banners
                })
            }
        })
    }
    render() {
        return (
            <div className='discoverBox'>
                <div className='banner'>
                    {
                        this.state.bannerList.length && (
                            <Slide data={this.state.bannerList}></Slide>
                        )
                    }
                </div>
                <div className='topTab'>
                    <p>
                        <a href="/#"> <i className='iconfont'>&#xe636;</i> </a><br/>
                        <span>歌单</span>
                    </p>
                    <p>
                        <a href="/#">
                            <i className='iconfont'>&#xe6c5;</i>
                        </a> <br/>
                        <span>排行榜</span>
                    </p>
                </div>
                <div className='musicListBox'>
                    <h3 onClick={()=>{
                        this.props.history.push('/sheetList')
                    }}>
                        <span>推荐歌单</span>
                        <i className='iconfont'>&#xe646;</i>
                    </h3>
                    <ColumnList list={this.state.personalized} onclickItem={id=>this.props.history.push('/playList/'+id)}></ColumnList>
                </div>
            </div>
        )
    }
}

export default Discover
