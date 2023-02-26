import {CaretUpFill} from  'react-bootstrap-icons';
import {Paperclip} from  'react-bootstrap-icons';

import React, { useState, useEffect,useCallback,useRef } from 'react';
import jwt_decode from "jwt-decode";





export default function ChatInterface({handleSendMess,ActiveChannel}){

  const [messtext,setmesstext] = useState();


  function CreateMess(){
    let user = jwt_decode(localStorage.getItem("User"));
     
     
    let mes = {
      "name": "PostMess",
      "object":{
        "UserId":user.Id.toString(),
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