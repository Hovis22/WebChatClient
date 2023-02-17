import ChatBlock from '../models/ChatBlock';

export default function IsActive(props){

    if(props.ActiveChannel != null){ 
    
        return <ChatBlock ActiveChannel={props.ActiveChannel}/>
    }
    else return "null";
}