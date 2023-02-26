import Header from './ChatHeader';
import Chat from './Chat';
import ChatInterface from './ChatInterface';


import React, { useState,useEffect } from 'react';



export default function ChatBlock({ActiveChannel,Messages,handleSendMess}) {
  const [isNull, setisNull] = useState(true);

  useEffect(()=>{
     if(Messages !=null){
      setisNull(false);
     }
  },Messages)


    return (
     <div className="chat-wrapper">

       <div className="chat-block">
           <Header ActiveChannel={ActiveChannel} />

           <div className="main-chat-wrapper">
           <div className="main-chat-block">
            <ChatInterface handleSendMess={handleSendMess} ActiveChannel={ActiveChannel} Messages={Messages}/>


            {isNull ? (
         <div></div>
      ) : (
        <>
            <Chat Messages={Messages}/>
       </>
      )}


     
           </div>
       </div>

        </div>

     </div>
    );
  }

