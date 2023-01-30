import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import { allMessages, postMessages } from '../fetch/messages'



export const useMessages = () => {
    const {jwt} = useContext(Context) as UserContexType
    const [messages, setMessages] = useState([]);
    const [state, setState] = useState({loading:false,
    error: false})
    const [dataNewMessage,setDataNewMessage] = useState("")

    const sendMessage = useCallback((info:any,id:string)=>{
        setState({loading:true,error:false})
        return postMessages(jwt,id,info)
            .then(res=>{
                setState({loading:false,error:false})
                setDataNewMessage(res)
                console.log(res)
                return res
            })
            .catch(err=>{
                setState({loading:false,error:true})
                console.error(err)
            })
    },[])   


    const getAllMessages = useCallback((chatId:string)=>{
        setState({loading:true,error:false})
        return allMessages(jwt,chatId)
            .then(res=>{
                setState({loading:false,error:false})
                setMessages(res)
                console.log(res)
                return res
            })
            .catch(err=>{
                setState({loading:false,error:true})
                console.error(err)
            })
    },[])  
    
    return {
        sendMessage,
        getAllMessages,
        setMessages,
        messages,
        dataNewMessage
    }
}
