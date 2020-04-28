import React, {Component} from 'react'
import './index.scss'
import ReactDom from 'react-dom'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'

class  Slide extends Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            currentPageIndex:0
        }
    }

    static defaultProps = {
        interval:4000,
        loop:true,
        autoPlay:true,
        threshold:0.1,
        speed:400
    }

    componentWillUnmount() {
        this.slide && this.slide.destroy() //销毁 better-scroll
    }

    //重新计算 better-scroll
    refresh() {
        if (this.slide === null) {
            return false
        }
        this.slide && this.slide.refresh()
    }

    componentDidMount() {
        if(!this.slide){
            this._initSlide()
            this._initWidth()
            if(this.props.autoPlay){
                this._play()
            }
        }
    }

    // 初始化
    _initSlide(){
        const slideEle = ReactDom.findDOMNode(this.refs.sildeWrapper)
        this.slide = new BScroll(slideEle,{
            scrollX: true,
            scrollY: false,
            momentum: true,
            snap:{
                loop:this.props.loop,
                speed:this.props.speed,
                threshold: this.props.threshold
            },
            bounce: !this.props.loop,
            stopPropagation: true
        })
        this.slide.goToPage(this.state.currentPageIndex, 0, 0)
        // 绑定滚动结束事件
        this.slide.on('scrollEnd', this._onScrollEnd)

        // 绑定滚动开始前事件
        this.slide.on('beforeScrollStart', () => {
            if (this.props.autoPlay) {
                clearTimeout(this.timer)
            }
        })
        this._touchEndEvent = ()=>{
            this._play()
        }
        slideEle.addEventListener('touchend', this._touchEndEvent, false)
    }
    /* 初始化宽度 */
    _initWidth(){
        let slideWidth = ReactDom.findDOMNode(this.refs.sildeWrapper).clientWidth
        const slideList = ReactDom.findDOMNode(this.refs.slideGroup).children
        let width = 0
        if(slideList.length){
            for(let i = 0;i<slideList.length;i++){
                slideList[i].style.width = `${slideWidth}px`
                width+=slideWidth
            }
        }
        /*if(this.props.loop && slideList.length>1){
            width += 2*slideWidth
        }*/
        ReactDom.findDOMNode(this.refs.slideGroup).style.width = `${width}px`
    }

    _play = ()=>{
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.slide && this.slide.next()
        },this.props.interval)
    }
    _onScrollEnd = ()=>{
        let pageIndex = this.slide.getCurrentPage().pageX
        this.setState({
            currentPageIndex: pageIndex
        })
        if(this.props.autoPlay){
            this._play()
        }
    }
   render(){
        const {data} = this.props
       return (
           <div className='silde-wrapper' ref='sildeWrapper'>
               <div className='slide-group' ref='slideGroup'>
                   {data.length &&
                        data.map((item,index)=>(
                            <div className='slide-item' key={item.targetId}>
                                <img src={item.imageUrl} alt=""/>
                            </div>)
                        )
                   }
               </div>
               <ul className='dotBox'>
               {
                   data.length && data.map((item,index)=>(
                       <li className={index === this.state.currentPageIndex ? 'active' : ''} key={index}>
                           {index === this.state.currentPageIndex}
                       </li>
                   ))
               }
               </ul>
           </div>
       )
   }
}

export default Slide
