import ChanInterface from './ChanInterface';
import Channel from './Channel';
import React, { useState, useEffect } from 'react';


const friendList = [
  { id: 1, name: 'Татьяна' },
  { id: 2, name: 'Алла' },
  { id: 3, name: 'Лиля' },
];


export default function ChannelsBlock() {
  const [activeID, setactiveID] = useState(null);
 
  useEffect(() => {
   console.log(activeID);
  });

    return (
      <div className="mess-channels">
       <ChanInterface/>
      {friendList.map((friend)=><Channel key={friend.id} activeID={activeID} friend={friend} setactiveID={setactiveID}/>)}
      </div>
    );
  }

