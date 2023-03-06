import { useEffect, useState } from "react";

export default function ChatHeader({ActiveChannel}) {
  
   const [status,setstatus]=useState(null);

  useEffect(()=>{
    if(ActiveChannel!=null){
       if(ActiveChannel.UserStatus == true){
        setstatus("Online");
       }
       else if(ActiveChannel.UserStatus == false){
        setstatus("Offline");
       }
    }
  },[ActiveChannel.UserStatus,ActiveChannel])


  
    return (
        <div className="chat-header">
        <div className="user-info">
          <div className="user-avatar">
          <img src={`data:image/png;base64,${ActiveChannel.UserImage}`} alt=""/>
          </div>
          <div className="text-block">
            <h3>{ActiveChannel.UserName}</h3>
            <p>{status}</p>
          </div>
        </div>
        <div className="chat-menu">
          <img src="/img/three-dots-vertical.svg" alt=""/>
        </div>
      </div>
    );
  }

