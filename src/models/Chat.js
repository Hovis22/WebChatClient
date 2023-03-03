import jwt_decode from "jwt-decode";

import React, { useState } from "react";

import ContextMenu   from "../models/ContextMenu";



export default function Chat({Messages,setmesstext,setmessid}) {
  
 
    
    return (
    

<div className="scroll-block">

<div className="centre-block">


    <ContextMenu items={Messages} setmesstext={setmesstext} setmessid={setmessid}/>
     
</div>

</div>

    );
  }