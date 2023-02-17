import ChanInterface from './ChanInterface';
import Channel from './Channel';




export default function ChannelsBlock({activeID,setactiveID,friendList}) {
  
 

    return (
      <div className="mess-channels">
       <ChanInterface/>
      {friendList.map((friend)=><Channel key={friend.id} activeID={activeID} friend={friend} setactiveID={setactiveID}/>)}
      </div>
    );
  }

