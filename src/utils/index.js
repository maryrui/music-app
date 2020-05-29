export const formatPlayCount = item=>{
    return item/10000>9 ?
            item/1000>10000
            ?
            `${(item/100000000).toFixed(1)}亿`
            :`${Math.ceil(item/10000)}万`
        :Math.floor(item)
}

export const addZero=s=>{
    return s >=10 ? s : '0'+s
}

export const formatTime = time=>{
   let minute = Math.floor(time/60)
    let second = Math.floor(time % 60)
    return `${addZero(minute)}:${addZero(second)}`
}

export const findIndex = (list, music) => {
    return list.findIndex(item => {
        return item.id === music.id
    })
}