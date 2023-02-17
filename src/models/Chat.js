

let userId = 1;

function IsOwn(message){
    console.log(message);
    if(message.userId == userId){
   return( <div key={message.id} className="message-own-wrapper">
    <p>{message.text}</p>
  </div>);
   }
   else{
    return( <div key={message.id}  className="message-other-wrapper">
    <p>{message.text}</p>
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