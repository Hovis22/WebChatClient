 import ChannelsBlock from './models/ChannelsBlock';
 import IsActive from './func/IsActive';
import jwt_decode from "jwt-decode";
import updateItemById from './func/Updates';
import { removeItemById,updateLastMessById,updateChannelStatusById,updateChannelCount,updateChannelCountZero,removeChanelById } from './func/Updates';


import React, { useState, useEffect,useCallback,useRef } from 'react';



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
  const [newMessage,setnewMessage] = useState(null);
  const [status,setStatus] = useState(null);

  
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
        setActiveChannel(channelsList.find(x => x.Id == activeID));
        console.log(activeID);
        let test = {
          "name": "GetChatById",
          "object":{
            "Id":activeID.toString(),
             "UserId":channelsList.find(x=>x.Id == activeID).UserId
          }
        }
        console.log(test);

        handleSendMess(test);
      }
        },[activeID]);
  


  
  useEffect(() => {
    if(ActiveChannel != null){  

      updateChannelCountZero({setchannelsList},ActiveChannel.Id);
      console.log(ActiveChannel);
      const elem = IsActive({ActiveChannel,messages,handleSendMess});
       console.log(ActiveChannel);
       setchatBl(elem);

    }
    
      },[ActiveChannel,messages]);




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
        if(searchResult.length >0){
        console.log(searchResult);
        setNullSearch(false);
        }
      }
    }, [searchResult]);


   useEffect(()=>{
    if(newMessage !=null){
      if(ActiveChannel !=null ){

     console.log(newMessage);
      if(ActiveChannel.Id == newMessage.ChatId){
        setmessages(prevState => prevState.concat(newMessage));

        let test = {
          "name": "MessagChecked",
          "object":{
             "MessageId":newMessage.Id
          }
        }
        handleSendMess(test);

      }
      else{
        updateChannelCount({setchannelsList},newMessage.ChatId);
      }
    }
    else{
      updateChannelCount({setchannelsList},newMessage.ChatId);
    }
   }},[newMessage])


   useEffect(()=>{
    console.log(status);
    console.log(activeID);
    if(status!=null && ActiveChannel !=null){
      console.log(status);
    if(ActiveChannel.UserId == status){
      setActiveChannel(prevChannel => ({
        ...prevChannel,
        UserStatus: !prevChannel.UserStatus
      }));
      console.log(ActiveChannel);
    }
    }
   },[status]);



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
           
            setnewMessage(data.Data);
        
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
            setStatus(data.Data);
           updateChannelStatusById({setchannelsList},data.Data,false);
           console.log(channelsList);
             break;
             case "SetOnline": 
             setStatus(data.Data);
             updateChannelStatusById({setchannelsList},data.Data,true);
               break;
               case "DeleteChat": 
               setActiveChannel(null);
               setactiveID(null);
               setmessages(null);
               setchatBl(null);
               removeChanelById({setchannelsList},data.Data);
     
                 break;






        }
      } catch (error) {
        console.error(error);
      }
    };
  }



  return (
    <div id='wrap' className="wrapper">
      
      <ChannelsBlock activeID={activeID} setactiveID={setactiveID} channelsList={channelsList} handleSearchChannel={setsearchmess} handleSendMess={handleSendMess} searchResult={searchResult} MessSearch = {searchmess} isNullSearch={isNullSearch} setNullSearch={setNullSearch}/>
       {chatBl}
    </div>
  );
}

export default App;
