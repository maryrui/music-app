import {combineReducers} from 'redux'
import * as ActionTypes from './actionTypes'

const initstates = {
    showPlayer:false,
    playList:[],
    currentIndex:-1,
    currentMusic:{}
}

function showPlayer(showPlayer = initstates.showPlayer,action){
    switch(action.type){
        case ActionTypes.SET_SHOW_PLAYER:
            return action.showPlayer
        default:
            return showPlayer
    }
}

function currentMusic(currentMusic=initstates.currentMusic,action){
    switch(action.type){
        case ActionTypes.SET_CURRENTMUSIC :
            return action.currentMusic
        default:
            return currentMusic
    }
}

function currentIndex(currentIndex=initstates.currentIndex,action){
    switch(action.type){
        case ActionTypes.SET_CURRENTINDEX :
            return action.currentIndex
        default:
            return currentIndex
    }
}


function playList(playList=initstates.playList,action){
    switch(action.type){
        case ActionTypes.SET_PLAYLIST :
            return action.playList
        default :
            return playList
    }
}

const reducer = combineReducers({
    showPlayer,
    currentMusic,
    currentIndex,
    playList
})

export default reducer