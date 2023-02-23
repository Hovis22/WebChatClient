import ChanInterface from './ChanInterface';
import Channel from './Channel';

import React, { useState, useEffect } from 'react';






export default function ChannelsBlock({activeID,setactiveID,channelsList,handleSubChannel}) {

  const [isNull, setisNull] = useState(true);


  
     useEffect(() => {
      if (channelsList !== null) {

        setisNull(false);
      }
    }, [channelsList]);



    return (
     


      <div className="mess-channels">
    
 
       
       <ChanInterface/>
         {isNull ? (
        <p>No Channels</p>
      ) : (
        <>

      {channelsList.map((channel)=>
          <Channel key={channel.Id} activeID={activeID} channel={channel} setactiveID={setactiveID}/>
      )}
      


       </>
      )}
      </div>
    );


    }

