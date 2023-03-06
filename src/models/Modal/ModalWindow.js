import { Pencil } from 'react-bootstrap-icons';

import jwt_decode from "jwt-decode";

function ModalWindow({ setShowModal,setisEdit}) {
    let user = jwt_decode(localStorage.getItem("User"));
   
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Account</h2>
            <div className='modal-buttons'>
             <Pencil style={{ cursor: 'pointer' }} onClick={() => setisEdit(true)}/>
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            </div>
          </div>
          <div className="modal-body" style={{ backgroundImage:`url(data:image/png;base64,${user.Image})` }}>

            <div className='info-container-modal'>
            <h2>{user.Name}</h2>
             <p>{user.Login}</p>

            </div>
                        
           
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalWindow;
  