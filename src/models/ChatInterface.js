import {CaretUpFill} from  'react-bootstrap-icons';
import {Paperclip} from  'react-bootstrap-icons';

import React, { useState, useEffect,useCallback,useRef } from 'react';





export default function ChatInterface({handleSendMess,ActiveChannel}){

  const [messtext,setmesstext] = useState();


  function CreateMess(){
    const mes = {
      "name": "PostMess",
      "object":{
        "UserId":localStorage.getItem("userId"),
        "ChatId":ActiveChannel.Id.toString(),
        "MessageText":messtext.toString()
      }
    }
  
    handleSendMess(mes);

  }


 return(
    <div className="centre-interf">
    <div className="message-interf">

      <input  onChange={(event) => setmesstext(event.target.value)} placeholder = "Message" type="text"/>

      <div className="icon-pad">

        <label className="custom-file-upload">
          <input type="file" />
          <Paperclip/>
        </label>

        <label onClick={CreateMess}  className="custom-button">
           <CaretUpFill/>
        </label>

      </div>
    </div>
  </div>
 );


}