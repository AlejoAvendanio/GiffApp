import React,{Suspense} from "react"
import { Loading } from "."
import { useNearSreen } from "../hooks/useNearScreen"


const TrendingSerches = React.lazy(
    ()=>import("../list/listOfCategority")
)

export default function LazyTrending(){
    const {show,elementRef} = useNearSreen()
    console.log(show)
    return <div ref={elementRef}>
        <Suspense fallback={<Loading/>}>
        {
            show ? <TrendingSerches/> : <Loading/>
        }
        </Suspense>
    </div>
}