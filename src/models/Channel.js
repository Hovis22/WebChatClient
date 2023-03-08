import { useEffect, useState } from 'react';


export default function Channel({setactiveID,channel,activeID}){
   const [messDate,setMessDate] = useState("");
   const [status,setStatus] = useState(null);

   
  var blstyle = "channel-block";
    if(activeID == channel.Id){
      blstyle= "channel-block-active";
    }


    useEffect(() => {
      console.log(channel);
      if(channel.UserStatus == false){
           setStatus("image-block");
       }
       else{
        setStatus("image-block-online");
       }
     }, [ ,channel.UserStatus]);
 



     useEffect(() => {
      const lastMessDate = new Date(channel.LastMessageCreated);
      const today = new Date();
    
      if (lastMessDate.getDate() === today.getDate()) {
        setMessDate(
          lastMessDate.getHours().toString() +
            ':' +
            lastMessDate.getMinutes().toString().padStart(2, '0')
        );
      } else if (
        Math.floor((today - lastMessDate) / (1000 * 60 * 60 * 24)) >= 7
      ) {
        // Show the day in the month and abbreviated month name if the message is within the past 7 days
        const options = { day: 'numeric', month: 'short' };
        const dateStr = lastMessDate.toLocaleDateString(undefined, options);
        setMessDate(dateStr);
      } else {
        // Show the abbreviated day name if the message is older than 7 days
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[lastMessDate.getDay()];
        setMessDate(dayName);
      }
    }, [channel.LastMessageCreated]);
    

    return (
        <div  className="channel-wrapper">

        <div onClick={()=>setactiveID(channel.Id)} className={blstyle}>
          <div className={status}>
            <img src={`data:image/png;base64,${channel.UserImage}`} alt=""/>
          </div>

          <div className="info-container">

            <div className="text-block">
              <h3>{channel.UserName}</h3>


              <p>{channel.LastMessage}</p>
            
            
            </div>


            <div className="date-check">
              <p>{messDate}</p>
              <div className="un-check">

              {channel.MessageCount > 0 ? (
        <p>{channel.MessageCount}</p>
      ) : (
             <></>
      )}


              </div>
            </div>

          </div>

        </div>

      </div>
      );
}