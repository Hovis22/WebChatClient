import { useEffect, useState } from 'react';


export default function Channel({setactiveID,channel,activeID}){
   const [messDate,setmessDate] = useState("");


  var blstyle = "channel-block";
    if(activeID == channel.Id){
      blstyle= "channel-block-active";
    }




    useEffect(() => {
     let  lastmess =new Date(channel.LastMessageCreated);
     const today = new Date();

      

    
       if(lastmess.getDate() == today.getDate()){
       
         setmessDate(lastmess.getHours().toString() +":" + lastmess.getMinutes().toString());
       }



    }, [channel.LastMessageCreated]);


    return (
        <div  className="channel-wrapper">

        <div onClick={()=>setactiveID(channel.Id)} className={blstyle}>
          <div className="image-block">
            <img src={require('../img/dora.jpg')} alt=""/>
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