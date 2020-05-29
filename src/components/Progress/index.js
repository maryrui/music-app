import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'
class Progress extends Component{
    static propTypes = {
        dragEnd : PropTypes.func
    }
    constructor(props){
        super(props)
        this.state={
            offsetWidth :0,
            status:false,
            startX:0,
            left:0
        }
    }

    /* 生命周期 */
    componentDidMount(){
        this.mmProgress = ReactDOM.findDOMNode(this.refs.progressBar)
        this.mmProgressInner = ReactDOM.findDOMNode(this.refs.mmProgressInner)
        this.bindEvents()
    }

    componentWillUnmount() {
        this.unbindEvents()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!this.state.status && nextProps.percent != this.props.percent){
            this.setState({
                offsetWidth:(this.mmProgress.clientWidth-8)*nextProps.percent
            })
        }
    }

    bindEvents(){
        document.addEventListener('touchmove',this.barMove)
        document.addEventListener('touchend',this.barUp)

        document.addEventListener('mousemove',this.barMove)
        document.addEventListener('mouseup',this.barUp)
    }

    unbindEvents(){
        document.removeEventListener('touchmove',this.barMove)
        document.removeEventListener('touchend',this.barUp)

        document.addEventListener('mousemove',this.barMove)
        document.addEventListener('mouseup',this.barUp)
    }

    barClick=e=>{
        let rect = this.mmProgress.getBoundingClientRect()
        let offsetWidth = Math.min(rect.width, Math.max(0, e.clientX - rect.left-8))
        this.setState({ offsetWidth })
        if(this.props.drawEd){
            this.props.drawEd(offsetWidth/this.mmProgress.clientWidth)
        }
    }

    Down=e=>{
        this.setState({
            status:true,
            startX:e.clientX || e.touches[0].pageX ,
            left:this.mmProgressInner.clientWidth
        })
    }

    barMove=e=>{
        if(this.state.status){
            let endX = e.clientX || e.touches[0].pageX,
                dist =endX - this.state.startX
            let offsetWidth = Math.min(this.mmProgress.clientWidth-8,Math.max(0,this.state.left+dist))
            this.setState({
                offsetWidth
            })
            /*if(this.props.drawEd){
                this.props.drawEd(offsetWidth/this.mmProgress.clientWidth)
            }*/
        }
    }

    barUp = () => {
        if(this.state.status){
            this.setState({
                status:false
            })
            if (this.props.drawEd) {
                this.props.drawEd((this.state.offsetWidth) / this.mmProgress.clientWidth)
            }
        }
    }

    render(){
        const {offsetWidth} = this.state
        return (
            <div className='progressBar-box' ref='progressBar' onClick={this.barClick}>
                <div className='progress-bar'></div>
                <div className='progress-outer' ref='mmProgressInner' style={{ color:'#ff5044',width: offsetWidth+'px' }}>
                    <div className='progress-dot' onTouchStart={this.Down} onMouseDown={this.Down}>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Progress