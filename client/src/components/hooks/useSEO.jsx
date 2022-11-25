import { useEffect, useRef } from "react";


export const useSEO = ({desciption,title}) => {
    const prevTitle = useRef(document.title)
    const prevDescription = useRef(document.querySelector('meta[name=description]').getAttribute("content"))
    useEffect(()=>{
        const previusTitle = prevTitle.current
        if(title){
            document.title = `Giff | ${title}`
        }
        return ()=> document.title = previusTitle
    },[title])
    useEffect(()=>{
        const metaDescription = document.querySelector('meta[name=description]')
        const previusDescription = prevDescription.current
        if(desciption){
            metaDescription.setAttribute("content",desciption)
        }

        return ()=> metaDescription.setAttribute("content", previusDescription)
    },[desciption])
}
