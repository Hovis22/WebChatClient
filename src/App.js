 import ChannelsBlock from './models/ChannelsBlock';
 import IsActive from './func/IsActive';
import jwt_decode from "jwt-decode";

import React, { useState, useEffect,useCallback,useRef } from 'react';



  var ActiveChannel = null;
function App() {
  const ws = useRef(null);
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


     
     ActiveChannel = channelsList.find(x => x.Id == activeID);
       const elem = IsActive({ActiveChannel,messages,handleSendMess});
       setchatBl(elem);

    }
      },[messages]);



   useEffect(()=>{
   
    if(searchmess != null){
      setsearchResult(null);
      if(searchmess.object.value.length > 3){  
 
      handleSendMess(searchmess);
      }
      else{
        setNullSearch(true);
      }
     }
   },[searchmess])



    useEffect(() => {
      if (searchResult !== null) {

        setNullSearch(false);
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
            console.log(data.Data);
            setmessages(data.Data);
            break;
          case "NewMessage":{
            setmessages(prevState => prevState.concat(data.Data));
          
            updateLastMessById(data.Data.ChatId,data.Data)
          }
              break;
          case "ChannelsFound": setsearchResult(data.Data);
                  break;
          case "AddChannel": 
          setNullSearch(true);
          setsearchmess(null);
          setchannelsList(data.Data.Id,data.Data);
                  break;
          case "ChangeMess": 
          updateItemById(data.Data.Id,data.Data);
                          break;
         case "DeleteMes": 
         console.log(data.Data);
         removeItemById(data.Data);
           break;

        }
      } catch (error) {
        console.error(error);
      }
    };
  }



  const updateLastMessById = (id, updatedItem) => {
    console.log(updatedItem.Mess_Text);
    setchannelsList(prevItems => {
      return prevItems.map(item => {
        if (item.Id === id) {
          return { ...item, LastMessage: updatedItem.Mess_Text, LastMessageCreated: updatedItem.Created };
        }
        return item;
      });
    });

    console.log(messages)
  };

  
  const updateItemById = (id, updatedItem) => {
    setmessages(prevItems => {
      return prevItems.map(item => {
        if (item.Id === id) {
          return { ...item, ...updatedItem };
        }
        return item;
      });
    });

    console.log(messages)
  };


  const removeItemById = (id) => {
    setmessages(prevItems => prevItems.reduce((acc, item) => {
      if (item.Id !== id) {
        acc.push(item);
      }
      return acc;
    }, []));
  };
  




   
  return (
    <div id='wrap' className="wrapper">
      
      <ChannelsBlock activeID={activeID} setactiveID={setactiveID} channelsList={channelsList} handleSearchChannel={setsearchmess} handleSendMess={handleSendMess} searchResult={searchResult} MessSearch = {searchmess} isNullSearch={isNullSearch}/>
       {chatBl}
    </div>
  );
}

export default App;
