import React, {Component} from 'react'

import './index.scss'
import PropTypes from "prop-types";
import {formatPlayCount} from '../../utils/index'



class ColumnList extends Component{

    static propTypes = {
        list:PropTypes.any.isRequired,
        onclickItem:PropTypes.func.isRequired
    }
    render(){
        const {list,onclickItem} = this.props
        return (
            <ul className='listBox'>
                {
                   list && list.map(item=>(
                        <li key={item.id} onClick={()=>onclickItem(item.id)}>
                            <div>
                                <img src={item.coverImgUrl} alt=""/>
                                <p><i className='iconfont'>&#xe602;</i>{formatPlayCount(item.playCount)}</p>
                            </div>
                            <p>{item.name}</p>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default ColumnList
