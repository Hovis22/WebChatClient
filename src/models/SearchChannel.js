


export default function SearchChannel({setactiveID,channel,activeID}){

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
                <h3>{channel.Name}</h3>
               
              </div>
  
  
              
  
            </div>
  
          </div>
  
        </div>
        );
  }