import Header from './ChatHeader';
import Chat from './Chat';
import ChatInterface from './ChatInterface';

const MessagesList = [
    { id: 1,userId: 1, text:"Hi" },
    { id: 2, userId: 1,text:"How are You"},
    { id: 3,userId: 2, text:"Hi"},
    { id: 4,userId: 2,  text:"Fine"},
  ];

export default function ChatBlock({ActiveChannel}) {
  


    return (
     <div className="chat-wrapper">

       <div className="chat-block">
           <Header ActiveChannel={ActiveChannel} />

           <div className="main-chat-wrapper">
           <div className="main-chat-block">
            <ChatInterface/>
            <Chat Messages={MessagesList}/>

     
           </div>
       </div>

        </div>

     </div>
    );
  }

