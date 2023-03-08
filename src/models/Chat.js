import jwt_decode from "jwt-decode";

import React, { useState,useRef,useEffect } from "react";

import ContextMenu   from "../models/ContextMenu";



export default function Chat({Messages,setmesstext,setmessid,handleSendMess,ActiveChannel}) {
    const blockRef = useRef(null);
    
    useEffect(() => {
        
        blockRef.current.scrollTop = blockRef.current.scrollHeight;
      }, []);
    
 
    
    return (
    

<div ref={blockRef} className="scroll-block">

<div className="centre-block">


    <ContextMenu items={Messages} setmesstext={setmesstext} setmessid={setmessid} handleSendMess={handleSendMess} ActiveChannel={ActiveChannel}/>
     
</div>

</div>

    );
  }