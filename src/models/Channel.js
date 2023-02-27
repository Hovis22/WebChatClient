

export default function Channel({setactiveID,channel,activeID}){

  var blstyle = "channel-block";
    if(activeID == channel.Id){
      blstyle= "channel-block-active";
    }



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
              <p>{channel.LastMessageCreated}</p>
              <div className="un-check">
                <p>{channel.MessageCount}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
      );
}