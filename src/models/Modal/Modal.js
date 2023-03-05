import { Pencil } from 'react-bootstrap-icons';
import ModalWindow from './ModalWindow';
import EditModal from "./EditModal";
import jwt_decode from "jwt-decode";
import { useState } from 'react';

function Modal({ setShowModal }) {
    let user = jwt_decode(localStorage.getItem("User"));
    const [isEdit,setisEdit] = useState(false);
    return (
        <>
        {isEdit ? (
           <EditModal setShowModal={setShowModal} setisEdit={setisEdit} />
          ) : (
          <ModalWindow setShowModal={setShowModal} setisEdit={setisEdit}/>
          )}
          </>
    );
  }
  
  export default Modal;
  