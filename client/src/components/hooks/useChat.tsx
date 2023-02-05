import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import { createChatFetch, getChatById, getChatsUser, searchFriendsChat } from '../fetch/chat'
import { Friend } from '../searchBar/searchFriend'


export const useChat = () => {
    const {jwt, setJWT,setFav,favs,chats,setChats,setChatSelected,chatSelected,chatInfo,setChatInfo} = useContext(Context) as UserContexType
    const [state, setState] = useState({loading:false,
    error: false})
    const [friend,setFriend] = useState<Friend[]>([])

    const fetchFriendChat = useCallback((input:string)=>{
        setState({loading:true,error:false})
        return searchFriendsChat(input,jwt)
            .then(res=>{
                setState({loading:false,error:false})
                setFriend(res)
                return res
            })
            .catch(err=>{
                setState({loading:false,error:true})
                console.error(err)
            })
    },[])   

    const createChat = useCallback((value:string)=>{
        return createChatFetch(value,jwt)
        .then(res=>{
            setChats(res)
            return res
        })
        .catch(err=>{
            console.error(err)
        })
    },[])

    const allChats = async () =>{
        const res = await getChatsUser(jwt)
        setChats(res)
        return res
    }

    const currentChat = useCallback(async(id:string)=>{
        const res = await getChatById(jwt,id)
        setChatInfo(res)
        return res
    },[])

    return {
        fetchFriendChat,
        friend,
        state,
        createChat,
        chats,
        allChats,
        setChatSelected,
        chatSelected,
        currentChat,
        setChatInfo,
        chatInfo,
        jwt
    }
}
