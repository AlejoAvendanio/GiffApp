import io from "socket.io-client";
import { useEffect, useState,useRef } from 'react'
import { useChat } from "../../hooks/useChat";
import { useMessages } from "../../hooks/useMessages";
import axios from "axios";
import "./style.css"
import ScrollToBottom from "../../../scroll";
let socket 
let selectedChatCompare
const name = window.localStorage.getItem("name")


export const Chat = ({handleChat2}) => {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const {jwt, chatSelected,chatInfo } =useChat()
  const { sendMessage,getAllMessages } = useMessages()
  const [typing,setTyping] = useState(false)
  const [isTyping,setIsTyping] = useState(false)
  const [socketConnection,setSocketConnection]= useState(false)
  const ref = useRef();
  const positionRef = useRef();
  const [typper,setTypper] = useState(null)
  const [scrollTarget, setScrollTarget] = useState(null);

  // scroll
  useEffect(() => {
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTarget]);

  //conecto a la sala
  

  useEffect(()=>{
    socket =io("https://giffapp-production.up.railway.app")
    socket.emit("setup",name)
    socket.on("conected",()=>setSocketConnection(true))
    socket.on("typing",(data)=>{
      setIsTyping(true)
      setTypper(data)
      console.log(data)
  })
    socket.on("stop typing",()=>{setIsTyping(false)
    setTypper(null)
    })
  },[])


  useEffect(()=>{
    getAllMessages(chatSelected).then(res=>setMessages(res))
    socket.emit("join chat",chatSelected)
    selectedChatCompare = chatSelected
  },[chatSelected,sendMessage,getAllMessages,setMessages])


  //origino la coneccion


    const handleSubmit =async (e)=>{
        e.preventDefault()
        const newMessage = {
          sander:{
            name:name,
            chatId:chatSelected
          },
          content:message
        };
        //ejecutar funcion para guardar mensaje
        // sendMessage(newMessage.content,chatSelected)
        const token = jwt.slice(1,-1)  
        const config = {
          method: "post",
          baseURL: `https://giffapp-production.up.railway.app/messages`,
          headers:{token:token},
          data:{id:chatSelected,content:newMessage.content}
        }
        const {data} = await axios(config)
        socket.emit("stop typing", chatSelected)
        socket.emit("new message",data)
        getAllMessages(chatSelected).then(res=>setMessages(res))
        // Hacer scroll automáticamente hacia abajo hasta el último mensaje
        setMessage("")
      }

      const typingHandler = (e) =>{
        setMessage(e.target.value)
        if(!socketConnection) return
        if(!typing) {
          setTyping(true)
          socket.emit("typing",chatSelected,name)
        }
        let lastTypingTime = new Date().getTime()
        let timerLength = 3000
        setTimeout(()=>{
          let timeNow = new Date().getTime()
          let timeDiff = timeNow - lastTypingTime
          if(timeDiff >= timerLength && typing){
            socket.emit("stop typing",chatSelected)
            setTyping(false)
          }
        },timerLength)
      }

      useEffect(()=>{
        socket.on("message recived",(newMessageRecived)=>{
          if(!selectedChatCompare || chatSelected !== newMessageRecived.chat._id){
            //noti
          }else{
            setMessages([...messages,newMessageRecived])
            
          }
        })
      })


    return (

    <div style={{ display:"flex",flexDirection:"column",background:"#202c33"}}>
        <header onClick={handleChat2} style={{background:"#202c33" ,height:45,fontSize:14, width:"100%",display:"flex",flexDirection:"column",borderBottom:"solid 1px black"}}>
          {
            chatInfo.users[0].name===name ?
            <p style={{margin:"5px 0 0 10px",color:"#c3c3c3",fontSize:15, fontWeight:600,display:"flex"}} >Chatea con {chatInfo.users[1].name}</p>
          :
          <p style={{margin:"5px 0 0 10px",color:"#c3c3c3",fontSize:15, fontWeight:600, display:"flex"}}>Chatea con {chatInfo.users[0].name}</p>

          }
        {
          typper?
          typper === name
          ?<></>
          : <p style={{margin:"0 0 0 10px",color:"#c3c3c3",display:"flex"}}>typing...</p>
          :<></>
        }
        </header>
      
        <div className="chat-container-message mi-scroll" id="messages" ref={ref}>
          <ul className="chat-list-ul" style={{display:"flex",flexDirection:"column"}} >
            {messages.map((message, i) => {
              let today = new Date(message.createdAt)
              return(
              <li
                key={i}
                className={`message-from ${
                  message?.sander?.name === name
                    ? "message-from-me"
                    : "message-from-friend"
                }`}
                ref={positionRef}
              >{
                message.sander.name===name ?
                <span className="message" style={{background:"#176b5b", display:"flex",position:"relative"}}>
                  <p style={{margin:0, display:"flex",textAlign:"start"}}>{message?.content}</p>
                  <p className="date">{`${today.getHours()}:${today.getMinutes()}`}</p>
                  {
                    i === messages.length-1 && (
                      <div ref={(el)=>setScrollTarget(el)}/>
                    )
                  }
                </span>
                :
                <span className="message" style={{background:"#343f46",position:"relative",display:"flex",flexDirection:"column"}}>
                  <div style={{margin:0, display:"flex",color:"#53bdeb"}}>{message?.sander?.name}</div>
                  <p style={{margin:0,display:"flex", textAlign:"start"}}>{message?.content}</p>
                  <p className="date">{today ? `${today.getHours()}:${today.getMinutes()}` : "now"}</p>
                </span>
              }
              </li>
            )})}
          </ul>
          
        </div>
        <form onSubmit={handleSubmit} className="chat-from-container">
        <input
          value={message}
          onChange={(e) =>typingHandler(e) }
          className="chat-input"
          id="mensaje"
        />
        <button>▲</button>
      </form>
      </div>
  )
}
