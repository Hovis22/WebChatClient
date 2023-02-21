

let userId = localStorage.getItem("userId");

function IsOwn(message){
    if(message.UserId == userId){
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