import { act } from 'react-dom/test-utils';

export default function Channel({setactiveID,friend,activeID}){

  var blstyle = "channel-block";
    if(activeID == friend.id){
      blstyle= "channel-block-active";
    }



    return (
        <div className="channel-wrapper">

        <div onClick={()=>setactiveID(friend.id)} className={blstyle}>
          <div className="image-block">
            <img src={require('../img/dora.jpg')} alt=""/>
          </div>

          <div className="info-container">

            <div className="text-block">
              <h3>{friend.name}</h3>
              <p>Hi how Do you Do?</p>
            </div>


            <div className="date-check">
              <p>00:51</p>
              <div className="un-check">
                <p>1</p>
              </div>
            </div>

          </div>

        </div>

      </div>
      );
}