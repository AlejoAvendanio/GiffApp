
const api_key = "7wJva7YAYuxRxDKhUNRaFiqEVnqqEOJo"

export function UseRandom() {
    const apiURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=alejo&rating=g`
    return fetch(apiURL)
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            console.log(res.data.title)
            return res.data.title})
}

