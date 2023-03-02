import jwt_decode from "jwt-decode";



export default function SearchChannel({channel,handleSendMess}){

       
    function SendUserToAdd(){
      let user = jwt_decode(localStorage.getItem("User"));

      let mess = {
  
        "name":"CreateChannel",
        "object":{
          "OwnUserId":user.Id.toString(),
          "UserToAdd":channel.Id.toString(),
        }
      }
      handleSendMess(mess);

    }


  
  
      return (
          <div className="channel-wrapper">
  
          <div onClick={()=>SendUserToAdd()} className="channel-block">
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