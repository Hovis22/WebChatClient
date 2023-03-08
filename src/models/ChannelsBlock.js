import ChanInterface from './ChanInterface';
import Channel from './Channel';

import React, { useState, useEffect } from 'react';
import SearchChannel from './SearchChannel';






export default function ChannelsBlock({activeID,setactiveID,channelsList,handleSearchChannel,handleSendMess,searchResult,MessSearch,isNullSearch}) {

  const [isNull, setisNull] = useState(true);

  const [filterChats,setfilterChats] = useState(null);

    useEffect(()=>{
      console.log(MessSearch);
     if(MessSearch != null){



      if( MessSearch.object.value != "" && channelsList!=[]){
      setfilterChats(channelsList.filter((item) => item.UserName.toLowerCase().startsWith(MessSearch.object.value.toLowerCase())));
      }
      else{
        setfilterChats(channelsList);
      }


    
    }
    else{
      if(channelsList !=null){
      
      setfilterChats(channelsList);
     console.log(filterChats);  
 
    }
    }
    },[MessSearch,channelsList])




  
     useEffect(() => {
      if (filterChats !== null) {

        setisNull(false);
      }
    }, [filterChats]);


    return (
     


      <div className="mess-channels">
    
 
       
       <ChanInterface handleSearchChannel={handleSearchChannel}/>
         {isNull ? (
        <p>No Channels</p>
      ) : (
        <>

       {filterChats.map((channel)=>
          <Channel key={channel.Id} activeID={activeID} channel={channel} setactiveID={setactiveID}/>
      )}

      </>
   )}



      {isNullSearch ? (
          <></>
      ) : (
        <>
        <p>Global Search</p>
       {searchResult.map((channel)=>
          <SearchChannel key={channel.Id} activeID={activeID} channel={channel} setactiveID={setactiveID} handleSendMess={handleSendMess}/>
      )}
      </>
   )}



      </div>


  
    

       
   
    );


    }

