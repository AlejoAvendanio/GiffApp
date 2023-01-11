import io from "socket.io-client";


import React, { useEffect, useState } from 'react'

const socket = io("http://localhost:3002");
const name = window.localStorage.getItem("name")

export const Chat = () => {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [typier,setTyper] = useState("")
  let mensaje = document.getElementById("mensaje")



    const handleSubmit = (e)=>{
        e.preventDefault()
        socket.emit("message",message,{name})
        const newMessage = {
          body: message,
          from: name,
        };
        setMessage("")
        setMessages([newMessage, ...messages]);
      }



    
      useEffect(() => {
        const reciveMessage = (message) => {
          console.log(message)
          setMessages([message, ...messages]);
        };
        
        socket.on("message", reciveMessage,setTyper(""));
        if(mensaje){
        mensaje.addEventListener("keypress",()=>{
          socket.emit("chat:typing",name)
        })}
        
        return () => {
          socket.off("message", reciveMessage);
        }
      }, [messages,mensaje]);



      socket.on("chat:typing",(datos)=>{
        setTyper(`${datos} esta escribiendo`)
      })



      console.log(typier)



    return (

    <div>
        {
          typier!==name
          ? <p style={{"color":"#fff"}}>{typier}</p>
          : ""
        }


      <form onSubmit={handleSubmit} className="chat-from-container">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          id="mensaje"
        />
        <div className="chat-container-message">
          <ul className="chat-list-ul">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-from ${
                  message.from === name
                    ? "message-from-me"
                    : "message-from-friend"
                }`}
              >
                <span>
                  {message.from}: {message.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </form>
      </div>
  )
}
