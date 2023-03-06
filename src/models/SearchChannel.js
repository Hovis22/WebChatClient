  import jwt_decode from "jwt-decode";
  import { useEffect, useState } from "react";



  export default function SearchChannel({channel,handleSendMess}){

      
    const [image,setImage] = useState();
      

      // useEffect(()=>{
      // if(channel!=null){
      //   const base64String = btoa(
      //     String.fromCharCode.apply(null, channel.Image)
      //   );
      //   setImage(`data:image/png;base64,${base64String}`);
      // }    
      // },[channel])

        
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
                <img src={`data:image/png;base64,${channel.Image}`} alt=""/>
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