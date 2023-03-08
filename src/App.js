 import ChannelsBlock from './models/ChannelsBlock';
 import IsActive from './func/IsActive';
import jwt_decode from "jwt-decode";
import updateItemById from './func/Updates';
import { removeItemById,updateLastMessById,updateChannelStatusById } from './func/Updates';


import React, { useState, useEffect,useCallback,useRef } from 'react';



var ActiveChannel = null;
function App() {
  const ws = useRef(null);
  const [ActiveChannel,setActiveChannel] = useState(null);
  const [socket, setSocket] = useState({});
  const [activeID, setactiveID] = useState(null);
  const [chatBl, setchatBl] = useState(null);
  const [channelsList,setchannelsList] = useState(null)
  let [messages,setmessages] = useState(null);
  const [searchmess,setsearchmess] = useState(null);
  let [searchResult,setsearchResult] = useState(null);
  const [isNullSearch, setNullSearch] = useState(true);



  
  useEffect(() => {
        
    let user = jwt_decode(localStorage.getItem("User"));
     
      ws.current = new WebSocket("wss://localhost:7237/hi?id="+ user.Id);
      setSocket(ws.current);
      gettingData();
    


    return () => {
      
      ws.current.close(); 
     setSocket(null);
    };
     },[]);




    useEffect(() => {
      if(activeID != null){  
        console.log(activeID);
        let test = {
          "name": "GetChatById",
          "object":{
            "Id":activeID.toString(),
            
          }
        }
        console.log(test);

        handleSendMess(test);
      }
        },[activeID]);
  


  
  useEffect(() => {
    if(messages != null){  


      console.log(ActiveChannel);
      setActiveChannel(channelsList.find(x => x.Id == activeID));

    }
      },[messages]);


  useEffect(()=>{
    if(ActiveChannel!=null){
       const elem = IsActive({ActiveChannel,messages,handleSendMess});
       console.log(ActiveChannel);
       setchatBl(elem);
    }
  },[ActiveChannel])



   useEffect(()=>{
   
    if(searchmess != null){
      setsearchResult(null);
      if(searchmess.object.value.length > 3){  
 
      handleSendMess(searchmess);
      }
     
     }
   },[searchmess])



    useEffect(() => {
      if (searchResult !== null) {
        if(searchResult.length >1){
        console.log(searchResult);
        setNullSearch(false);
        }
      }
    }, [searchResult]);





  async function handleSendMess(mes) {

     let data = await JSON.stringify(mes);
     console.log(data);
     console.log(socket);
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
          case "NewMessage":{
            if(messages !=null && ActiveChannel.Id == data.Data.ChatId){
            setmessages(prevState => prevState.concat(data.Data));
            }
            updateLastMessById({setchannelsList},data.Data.ChatId,data.Data)

          }
              break;
          case "ChannelsFound": setsearchResult(data.Data);
                  break;
          case "AddChannel": 
          setNullSearch(true);
          setsearchmess(null);
            
          setchannelsList(data.Data);
                  break;
          case "ChangeMess": 
          updateItemById({setmessages},data.Data.Id,data.Data);
                          break;
         case "DeleteMes": 
         removeItemById({setmessages},data.Data);
           break;
           case "SetOffline": 
        
           updateChannelStatusById({setchannelsList,setActiveChannel},data.Data,false,ActiveChannel);
           console.log(channelsList);
             break;
             case "SetOnline": 
      
             updateChannelStatusById({setchannelsList,setActiveChannel},data.Data,true,ActiveChannel);
        
               break;
        }
      } catch (error) {
        console.error(error);
      }
    };
  }



  return (
    <div id='wrap' className="wrapper">
      
      <ChannelsBlock activeID={activeID} setactiveID={setactiveID} channelsList={channelsList} handleSearchChannel={setsearchmess} handleSendMess={handleSendMess} searchResult={searchResult} MessSearch = {searchmess} isNullSearch={isNullSearch}/>
       {chatBl}
    </div>
  );
}

export default App;
