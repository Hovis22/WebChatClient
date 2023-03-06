import { List,X} from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';
import { PersonFill } from 'react-bootstrap-icons';
import { BoxArrowLeft } from 'react-bootstrap-icons';
import { useState, useCallback, useRef,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import Modal from "./Modal/Modal";

function ChanInterface({ handleSearchChannel }) {
  const inputRef = useRef('');
  const timeoutRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef(null);


  const onChangeDelayed = useCallback(
    (event) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let user = jwt_decode(localStorage.getItem("User"));

        let mess = {
          "name": "SearchChannels",
          "object": {
            "value": inputRef.current.value.toString(),
            "userId": user.Id.toString()
          }
        }

        handleSearchChannel(mess);
        timeoutRef.current = null;
      }, 1000);
    },
    [],
  );




  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  }, []);
  
  const closeMenu = useCallback((event) => {
    if (!event.target.closest('.chan-menu')) {
      setIsMenuOpen(false);
      document.getElementById("wrap").removeEventListener('click', closeMenu);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.getElementById("wrap").addEventListener('click', closeMenu);
    } else {
      document.getElementById("wrap").removeEventListener('click', closeMenu);
    }
  }, [isMenuOpen, closeMenu]);

 




  return (
    <>
    <div className="channels-interface">
      <div className="menu-wrapper" ref={menuRef}>
             <div>
        {isMenuOpen ? (
          <X className='zxc' onClick={handleMenuToggle}/>
        ) : (
          <List className='zxc' onClick={handleMenuToggle} />
        )}
</div>

        {isMenuOpen && (
          <ul className="chan-menu">
            <li onClick={() => setShowModal(true)}><PersonFill/>Account</li>
            <li onClick={() => {localStorage.removeItem("User");window.location.reload();}}><BoxArrowLeft/>Exit</li>
          </ul>
        )}
 
         {showModal && (<Modal setShowModal={setShowModal}/>)}
      </div>

      <div className="search-input">
        <Search />
        <input onChange={onChangeDelayed} ref={inputRef} placeholder="Search" type="text" />
      </div>
    </div>
    </>
  );
}

export default ChanInterface;
