import Channels from './models/ChannelsBlock';
import ChatBlock from './models/ChatBlock';
import IsActive from './func/IsActive';

import React, { useState, useEffect } from 'react';

const friendList = [
  { id: 1, name: 'Татьяна',isOnline:"Online" },
  { id: 2, name: 'Алла', isOnline:"last seen 5 min"},
  { id: 3, name: 'Лиля', isOnline:"Online"},
  { id: 4, name: 'Back', isOnline:"last seen 12 min"},
];

  var ActiveChannel = null;
function App() {
  const [activeID, setactiveID] = useState(null);
  const [chatBl, setchatBl] = useState(null);

  useEffect(() => {
   
    if(activeID != null){  

      

     ActiveChannel = friendList.find(x => x.id == activeID);

      const elem = IsActive({ActiveChannel});
       setchatBl(elem);
    }
      },[activeID]);


   
  return (
    <div id='wrap' className="wrapper">
      
       <Channels activeID={activeID} setactiveID={setactiveID} friendList={friendList} />
       {chatBl}
    </div>
  );
}

export default App;
