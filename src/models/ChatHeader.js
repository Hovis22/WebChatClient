export default function ChatHeader({ActiveChannel}) {
  
 

    return (
        <div className="chat-header">
        <div className="user-info">
          <div className="user-avatar">
            <img src="/img/dora.jpg" alt=""/>
          </div>
          <div className="text-block">
            <h3>{ActiveChannel.name}</h3>
            <p>{ActiveChannel.isOnline}</p>
          </div>
        </div>
        <div className="chat-menu">
          <img src="/img/three-dots-vertical.svg" alt=""/>
        </div>
      </div>
    );
  }

