import {List} from  'react-bootstrap-icons';
import {Search} from  'react-bootstrap-icons';
import {useState,useCallback,useRef} from 'react';
import jwt_decode from "jwt-decode";


 function ChanInterface({handleSearchChannel}) {
  const inputRef  = useRef('');
  const timeoutRef = useRef(null);


  const onChangeDelayed = useCallback(
    (event) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let user = jwt_decode(localStorage.getItem("User"));

        let mess = {
          "name": "SearchChannels",
          "object":{
            "value":inputRef.current.value.toString(),
            "userId":user.Id.toString()
          }
        }
 

        handleSearchChannel(mess)
        timeoutRef.current = null;
      }, 1000);
    },
    [],
  );


  
  return (
      <div className="channels-interface">
        
        <div className="menu-wrapper">
          <List className='zxc'/>
         </div>

          <div className="search-input">
          <Search/>
          <input onChange={onChangeDelayed} ref={inputRef }   placeholder="Search" type="text" />
          </div>
        
      </div>
    );
  }

  export default ChanInterface;