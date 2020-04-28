import React from 'react'
import {withRouter} from 'react-router-dom'
import './index.scss'
const Header = props=>{
    let  showHeader= /discover/.test(props.location.pathname)>0 ? true : false
    return(
        showHeader && (
            <div className='header'>
                <i className='iconfont'>&#xe937;</i>
                <span>{props.title}</span>
                <i className='iconfont'>&#xe60c;</i>
            </div>
        )
    )
}

export default withRouter(Header)
