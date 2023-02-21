import ChatBlock from '../models/ChatBlock';

export default function IsActive({ActiveChannel,messages}){
    

    if(ActiveChannel != null){ 
    
        console.log(messages);
        return <ChatBlock ActiveChannel={ActiveChannel} Messages={messages}/>
    }
    else return "null";
}