import React,{Component} from 'react'

class Search extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tabData: [
                {
                    title: '单曲',
                    type: 1
                },
                {
                    title: '歌单',
                    type: 1000
                }
            ]
        }
    }
    render() {
        return(
            <div className='searchBox'>
                <nav className='searchHeard'>
                    <i className='iconfont'>&#xe937;</i>
                    <input type="text" placeholder='搜索你喜欢的'/>
                </nav>
                <div>
                    <div>
                        <h2>热门搜索</h2>
                        <ul>
                            <li>牛奶咖啡</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Search