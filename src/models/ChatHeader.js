import { useEffect, useState } from "react";
import {TrashFill} from  'react-bootstrap-icons';
export default function ChatHeader({ActiveChannel,handleSendMess}) {
  
   const [status,setstatus]=useState(null);

   
    function DeleteChat(){
      let test = {
        "name": "DeleteChat",
        "object":{
           "ChatId":ActiveChannel.Id
        }
      }

     handleSendMess(test);


    }


  useEffect(()=>{
    console.log(ActiveChannel.UserStatus);
    if(ActiveChannel!=null){
       if(ActiveChannel.UserStatus == true){
        setstatus("Online");
       }
       else if(ActiveChannel.UserStatus == false){
        setstatus("Offline");
       }
    }
  },[ActiveChannel.UserStatus])


  
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
          <TrashFill className="three-dots" onClick={DeleteChat}/>
        </div>
      </div>
    );
  }

