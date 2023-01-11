import {useEffect,useRef} from 'react'
import "./style.css"
import ReactDOM from "react-dom"

interface props {
  children:any,
  onClose:(state:any)=>any,
}

const Modal = ({children,onClose}:props) => {
  const menuRef = useRef<any>(null)
  
  
  useEffect(()=>{
    let handle = (e:MouseEvent | null)=>{
        if(!menuRef?.current?.contains(e?.target)){
            onClose(false)
        }
    }
    document.addEventListener("mousedown",handle)
    return()=>{
        document.removeEventListener("mousedown",handle)
    }
})
  return (
    <div className='modal'>
        <div className='modal-contenido' ref={menuRef}>
            <button style={{cursor:"pointer"}} className='btn' onClick={()=>onClose(false)}>✖</button>
            {children}
        </div>
    </div>
  )
}
const div = document.getElementById("modal-root") as HTMLElement
export default function ModalPortal({children,onClose}:props){
    return ReactDOM.createPortal(
        <Modal onClose={onClose}>
            {children}
        </Modal>,
        div
    )
  }