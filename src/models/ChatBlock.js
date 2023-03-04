import Header from './ChatHeader';
import Chat from './Chat';
import ChatInterface from './ChatInterface';


import React, { useState,useEffect } from 'react';



export default function ChatBlock({ActiveChannel,Messages,handleSendMess}) {
  const [isNull, setisNull] = useState(true);
  const [messtext,setmesstext] = useState();
  const [messid,setmessid] = useState("");

  useEffect(()=>{
     if(Messages !=null){
      setisNull(false);
     }
     else
     setisNull(true)
  },Messages)



    return (
     <div className="chat-wrapper">

       <div className="chat-block">
           <Header ActiveChannel={ActiveChannel} />

           <div className="main-chat-wrapper">
           <div className="main-chat-block">
            <ChatInterface handleSendMess={handleSendMess} ActiveChannel={ActiveChannel} Messages={Messages}  messtext={messtext}  setmesstext={setmesstext} messid={messid}/>


            {isNull ? (
         <></>
      ) : (
        <>
          
            <Chat setmesstext={setmesstext} setmessid={setmessid} Messages={Messages} handleSendMess={handleSendMess}  ActiveChannel={ActiveChannel}/>
       </>
      )}


     
           </div>
       </div>

        </div>

     </div>
    );
  }

