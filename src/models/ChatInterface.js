import {CaretUpFill} from  'react-bootstrap-icons';
import {Paperclip} from  'react-bootstrap-icons';

import React, { useState, useEffect,useCallback,useRef } from 'react';
import jwt_decode from "jwt-decode";





export default function ChatInterface({handleSendMess,ActiveChannel,messtext,setmesstext,messid}){

 


   
  function CreateMess(){
    let user = jwt_decode(localStorage.getItem("User"));
     
     
    let mes = {
      "name": "PostMess",
      "object":{
        "UserId":user.Id.toString(),
        "ChatId":ActiveChannel.Id.toString(),
        "MessageText":messtext.toString(),
        "MessageId":messid
      }
    }
   console.log(mes);
  
    handleSendMess(mes);
    setmesstext("");
  }


 return(
    <div className="centre-interf">
    <div className="message-interf">

      <input value={messtext}  onChange={(event) => setmesstext(event.target.value)} placeholder = "Message" type="text"/>

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