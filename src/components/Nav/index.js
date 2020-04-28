import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.scss'
const Nav = props=>{
    const {title='歌单',history} = props
    return (
        <div className='navBox'>
            <i className='iconfont' onClick={history.goBack}>&#xe937;</i><p>{title}</p>
        </div>
    )
}

Nav.propTypes = {
    title: PropTypes.string //标题
}
export default withRouter(Nav)
