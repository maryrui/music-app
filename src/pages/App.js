import React,{Component} from 'react'
import { BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Discover from './discover'
import SheetList from './sheetlist'
import PlayList from './playList'
import Player from "../components/Player";
import '../styles/index.scss'
/*import
{
    BrowserRouter as Router
}
from 'react-dom'*/

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            title : "霸气姚专用云音乐"
        }
    }
    render(){
        return (
           <Router>
               <div>
                   <Header title={this.state.title}></Header>
                   <div className='content'>
                       <Switch>
                           <Route path='/discover'  component={Discover} />
                           <Route path='/sheetList' component={SheetList} />
                           <Route path='/playList/:id' component={PlayList} />
                           <Redirect to='/discover'></Redirect>
                       </Switch>
                   </div>
               </div>
               {
                   this.props.showPlayer &&  <Player />
               }

           </Router>
        )
    }
}

const mapStateToProps = state =>({
    showPlayer:state.showPlayer

})

export default connect(mapStateToProps)(App)
