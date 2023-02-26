 import ChannelsBlock from './models/ChannelsBlock';
 import IsActive from './func/IsActive';
import jwt_decode from "jwt-decode";

import React, { useState, useEffect,useCallback,useRef } from 'react';



  var ActiveChannel = null;
function App() {
  const ws = useRef(null);
  const [socket, setSocket] = useState(null);
  const [activeID, setactiveID] = useState(null);
  const [chatBl, setchatBl] = useState(null);
  const [channelsList,setchannelsList] = useState(null)
  let [messages,setmessages] = useState(null);



  useEffect(() => {
    console.log(123);
    
    let user = jwt_decode(localStorage.getItem("User"));
     
      console.log(user);
      ws.current = new WebSocket("wss://localhost:7237/hi?id="+ user.Id);
      setSocket(ws.current);
      gettingData();
    


    return () => {
      ws.current.close(); 
    };
     },[]);




    useEffect(() => {
      if(activeID != null){  
        handleSubChannel();
      }
        },[activeID]);
  


  
  useEffect(() => {
    if(messages != null){  


      console.log(messages);
     ActiveChannel = channelsList.find(x => x.Id == activeID);
       const elem = IsActive({ActiveChannel,messages,handleSendMess});
       setchatBl(elem);

    }
      },[messages]);



   async function handleSubChannel() {
 
    let test = {
      "name": "GetChatById",
      "object":{
        "Id":activeID.toString(),
        
      }
    }

    console.log("handle");
     let data = JSON.stringify(test);
      console.log(data);
     await socket.send(data);
   
    
  };


  async function handleSendMess(mes) {

     let data = await JSON.stringify(mes);
     await socket.send(data);

  };



  const gettingData = useCallback(() => {
    DataFromServer();
  }, []);
  
   function DataFromServer() {
    if (!ws.current) return;
  
    ws.current.onmessage = (e) => {
      try {
        const message = e.data;
        const data = JSON.parse(message);
       console.log(data);
        switch (data.Name) {
          case "GetChannels":
            setchannelsList(data.Data);
            break;
          case "Messages":
            setmessages(data.Data);
            break;
          case "NewMessage":
            { 
              // let arr = messages +data.Data;
              // console.log(arr);
              setmessages(prevState => prevState.concat(data.Data));
             
            }
              break;
        }
      } catch (error) {
        console.error(error);
      }
    };
  }



  
   
  return (
    <div id='wrap' className="wrapper">
      
      <ChannelsBlock activeID={activeID} setactiveID={setactiveID} channelsList={channelsList}/>
       {chatBl}
    </div>
  );
}

export default App;
