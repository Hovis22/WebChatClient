import {CaretUpFill} from  'react-bootstrap-icons';
import {Paperclip} from  'react-bootstrap-icons';

import React, { useState, useEffect,useCallback,useRef } from 'react';





export default function ChatInterface(){
//   const ws = useRef(null);
//   const [socket, setSocket] = useState(null);


//   function GetWeb(){

//     let id = localStorage.getItem("userId");
//     ws.current = new WebSocket("wss://localhost:5028/hi?id="+id); // создаем ws соединение
//     setSocket(ws);
//     gettingData();
//   }
  
  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//    console.log(123);
   
//       socket.current.send("Hi from Client");
   
    
//   };


  



// const gettingData = useCallback(() => {
//   if (!ws.current) return;

//   ws.current.onmessage = e => {            
//       const message = e.data;
//      console.log(message);
//   };
// });






 return(
    <div className="centre-interf">
    <div className="message-interf">

      <input placeholder = "Message" type="text"/>

      <div className="icon-pad">

        <label className="custom-file-upload">
          <input type="file" />
          <Paperclip/>
        </label>

        <label  className="custom-button">
           <CaretUpFill/>
        </label>

      </div>
    </div>
  </div>
 );


}