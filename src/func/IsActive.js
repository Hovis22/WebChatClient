import ChatBlock from '../models/ChatBlock';

export default function IsActive({ActiveChannel,messages,handleSendMess}){
    

    if(ActiveChannel != null){ 
    
        console.log(messages);
        return <ChatBlock ActiveChannel={ActiveChannel} Messages={messages} handleSendMess={handleSendMess}/>
    }
    else return "null";
}