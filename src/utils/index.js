export const formatPlayCount = item=>{
    return item/10000>9 ?
            item/1000>10000
            ?
            `${(item/100000000).toFixed(1)}亿`
            :`${Math.ceil(item/10000)}万`
        :Math.floor(item)
}
