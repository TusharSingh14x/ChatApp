import { useEffect, useRef, useState } from "react"



function App() {
const [messages,setMessage]=useState(["hi there","hello"]);
const wsRef=useRef<WebSocket|null>(null);
const inputRef=useRef<WebSocket|null>(null);
  useEffect(()=>{
const ws=new WebSocket("http://localhost:8080");
ws.onmessage=(event)=>{
 setMessage(m=>[...m,event.data])
}
wsRef.current=ws;
ws.onopen=()=>{
  ws.send(JSON.stringify({
    type:"join",
    payload:{
      roomId:"red"
    }
  }))
}
return()=>{
  ws.close()
}
},[])
  return (
    <>
   <div className='h-screen bg-black'>
    <br></br>
    <div className="h-[85vh]">
      {messages.map(message=><div className="m-10"><span className="bg-white text-black rounded p-4 ">{message}</span></div>)}
    </div>
    <div className="w-full bg-white flex p-4">
      <input className="flex-1" type="text" ref={inputRef}/>
      <button onClick={()=>{
        //@ts-ignore
        const msg=inputRef.current.value;
        wsRef.current?.send(JSON.stringify({
          type:"chat",
          payload:{
            message:msg
          }
        }))
      }}
      className="bg-purple-600 text-white p-4">Send Message</button>
    </div>
   </div>
    </>
  )
}

export default App
