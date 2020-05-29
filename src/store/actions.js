import * as ActionTypes from './actionTypes'
import {findIndex} from '../utils/index'
export function setShowPlayer(showPlayer){
    return {type:ActionTypes.SET_SHOW_PLAYER,showPlayer}
}

export function setCurrentMusic(currentMusic){
    return {type:ActionTypes.SET_CURRENTMUSIC,currentMusic}
}

export function setCurrentIndex(currentIndex){
    return {type:ActionTypes.SET_CURRENTINDEX,currentIndex}
}

export function setPlayList(playList){
    return {type:ActionTypes.SET_PLAYLIST,playList}
}

// 播放歌曲（替换歌单列表）
export const setAllPlay = ({ playList, currentIndex }) => dispatch => {
    dispatch(setShowPlayer(true))
    dispatch(setPlayList(playList))
    dispatch(setCurrentIndex(currentIndex))
    dispatch(setCurrentMusic(playList[currentIndex]))
}

