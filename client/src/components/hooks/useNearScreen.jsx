import { useEffect, useRef, useState } from "react"

export const useNearSreen = () => {
    const [show,setShow] = useState(false)
    const elementRef = useRef(null)
    useEffect(()=>{
        const onChance= (entries)=>{
            const el = entries[0]
            if(el.isIntersecting){
                setShow(true)
                observer.disconnect()
            }
        }
        const observer = new IntersectionObserver(onChance,{
            rootMargin:"50px"
        })
        observer.observe(elementRef.current)
        return () =>observer && observer.disconnect()
    })
    return {show,elementRef}
}