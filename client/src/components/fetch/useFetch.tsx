
export interface URL {
    keyword:string,
    images:{
        downsized_medium:{
            url:string
        },
    },
    title:string,
    url:string,
    id:string
}
export const api_key = "7wJva7YAYuxRxDKhUNRaFiqEVnqqEOJo"
const URI = "https://api.giphy.com/v1/gifs/search"
export default function UseFetch({keyword="" , page=0, limit=15, rating="g"}={}) {
    const apiURL = `${URI}?api_key=${api_key}&q=${keyword}&limit=${limit}&offset=${page*limit}&rating=${rating}&lang=es`
    return fetch(apiURL)
        .then(res=>res.json())
        .then(res=>{
            const gifs = res.data.map((e:URL)=>{return{
                url:e.images.downsized_medium.url,
                title: e.title,
                shared:e.url,
                id:e.id
            }})
            return gifs
        }); 
}

export interface GIF{
    title?:string,
    shared?:string,
    url?:string
}


export const getInfoById = ({id}:any)=>{
    console.log(id)
    const apiUrl = `https://api.giphy.com/v1/gifs/${id}?api_key=${api_key}`
    return fetch(apiUrl)
    .then(res=>res.json())
    .then(res=>{
        let gif = res.data
        gif = {
            title: gif.title,
            shared:gif.url,
            url:gif.images.downsized_medium.url
        }
        return gif
    })
}

export const getRandomGif = ({keyword=""}={})=>{
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${keyword}&limit=1&offset=0&rating=g&lang=es`
    return fetch(apiUrl)
    .then(res=>res.json())
    .then(res=>{
        const gifs = res.data.map((e:URL)=>{
            return{
            url:e.images.downsized_medium.url,
            id:e.id
        }})
        return gifs
    }); 

}



export const getTrendingTerms = ()=>{
    const apiUrl = `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`
    return fetch(apiUrl)
    .then(res=>res.json())
    .then(res=>res.data); 
}