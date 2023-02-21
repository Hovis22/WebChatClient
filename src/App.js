import ChannelsBlock from './models/ChannelsBlock';
import ChatBlock from './models/ChatBlock';
import IsActive from './func/IsActive';
import Cookies from 'js-cookie';

import React, { useState, useEffect,useCallback,useRef } from 'react';



  var ActiveChannel = null;
function App() {
  const ws = useRef(null);
  const [socket, setSocket] = useState(null);
  const [activeID, setactiveID] = useState(null);
  const [chatBl, setchatBl] = useState(null);
  const [channelsList,setchannelsList] = useState(null)
  const [messages,setmessages] = useState(null);



  useEffect(() => {
    let id = localStorage.getItem("userId");
    ws.current = new WebSocket("wss://localhost:5028/hi?id="+ id); // создаем ws соединение
    setSocket(ws.current);
    gettingData();


    return () => {
      ws.current.close(); 
    };
     },[]);


  const handleSubmit = (event) => {
 
    event.preventDefault();
    let test = {
      "name": "GetChatById",
      "object":{
        "Id":activeID,
        
      }
    }

    console.log("handle");
     let data = JSON.stringify(test);
      console.log(data);
      socket.send(data);
   
    
  };

  



     const  gettingData = useCallback(() => {
      if (!ws.current) return;
      
      ws.current.onmessage = e => {            
          const message = e.data;
        
        const data =  JSON.parse(message)
    
          switch(data.Name){
            case "GetChannels": setchannelsList(data.Data);
            break;
            case "Messages":setmessages(data.Data);
            break;
          }
    
     
    
      };
    });
    





  
  useEffect(() => {
    console.log(123);
    if(activeID != null){  

     ActiveChannel = channelsList.find(x => x.Id == activeID);
       const elem = IsActive({ActiveChannel,messages});
       setchatBl(elem);

    }
      },[messages]);


   
  return (
    <div id='wrap' className="wrapper">
      
       <ChannelsBlock activeID={activeID} setactiveID={setactiveID} channelsList={channelsList} setchannelsList={setchannelsList} handleSubmit={handleSubmit}/>
       {chatBl}
    </div>
  );
}

export default App;
