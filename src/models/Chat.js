import jwt_decode from "jwt-decode";

let user;
if(localStorage.getItem("User") !=null){
 user =jwt_decode(localStorage.getItem("User"));
}
function IsOwn(message){
    if(message.UserId == user.Id){
   return( <div key={message.Id} className="message-own-wrapper">
    <p>{message.Mess_Text}</p>
  </div>);
   }
   else{
    return( <div key={message.Id}  className="message-other-wrapper">
    <p>{message.Mess_Text}</p>
  </div>);
   }

   }


export default function Chat({Messages}) {
  
 
    
    return (
    

<div className="scroll-block">

<div className="centre-block">

    {Messages.map((message)=> IsOwn(message))}

</div>

</div>

    );
  }