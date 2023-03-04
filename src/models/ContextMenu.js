import React, { useState,useEffect,useRef } from "react";
import jwt_decode from "jwt-decode";


export default function ContextMenu(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const menuRef = useRef(null);


    function handleContextMenu(event, item) {
      event.preventDefault();
      setX(event.pageX);
      setY(event.pageY);
      setSelectedItem(item);
      setIsVisible(true);
    }
  

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsVisible(false);
          }
        }
    
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    


    function handleMenuChangeClick(itemId,itemValue) {
      setIsVisible(false);
      props.setmesstext(itemValue);
      props.setmessid(itemId);
   
    }


    function handleMenuDeleteClick(itemId,itemValue) {
      setIsVisible(false);
    
     let mes = {
        "name": "DeleteMes",
        "object":{
          "ChatId":props.ActiveChannel.Id.toString(),
          "MessId": itemId
        }
      }

      props.handleSendMess(mes);

    }


  
    return (
      <>
        {props.items.map((item) => (
          <div  key={item.Id} onContextMenu={(event) => handleContextMenu(event, item)}>
          {IsOwn(item)}
          </div>
        ))}
        {isVisible && (
          <div className="context_menu"
            style={{
              top: y,
              left: x
            }}
          >
            <ul className="context-block">
              <li onClick={() => handleMenuChangeClick(selectedItem.Id,selectedItem.Mess_Text)}>Change{selectedItem.name}</li>
              <li onClick={() => handleMenuDeleteClick(selectedItem.Id,selectedItem.Mess_Text)}>Delete{selectedItem.name}</li>
            </ul>
          </div>
        )}
      </>
    );
  }
  
  
  
  
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
  