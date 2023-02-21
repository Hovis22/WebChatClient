import ChanInterface from './ChanInterface';
import Channel from './Channel';

import React, { useState, useEffect,useCallback,useRef } from 'react';






export default function ChannelsBlock({activeID,setactiveID,channelsList,setchannelsList,handleSubmit}) {

  const [isNull, setisNull] = useState(true);


    
  

  
     useEffect(() => {
      if (channelsList !== null) {
        channelsList.forEach((channel) => console.log(channel));
        setisNull(false);
      }
    }, [channelsList]);


  
  // const handleSubmit = (event) => {

  //   event.preventDefault();
  //   let test = {
  //     "name": "GetChatById",
  //     "object":{
  //       "Id":2,
        
  //     }
  //   }
  //    const data = JSON.stringify(test);
     
    
  // };


    return (
     


      <div className="mess-channels">
    
 
       
       <ChanInterface/>
         {isNull ? (
        <p>No Channels</p>
      ) : (
        <>

      {channelsList.map((channel)=>
          <Channel key={channel.Id} activeID={activeID} channel={channel} setactiveID={setactiveID} handleSubmit={handleSubmit} />
      )}
      


       </>
      )}
      </div>
    );


    }

