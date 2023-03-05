import { useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Paperclip } from 'react-bootstrap-icons';
import { List, X } from 'react-bootstrap-icons';
import jwt_decode from 'jwt-decode';

function EditModal({ setShowModal, setisEdit }) {
  let user = jwt_decode(localStorage.getItem('User'));

  const iconStyle = {
    fontSize: '54px',
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBytes, setfileBytes] = useState(null);



  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileBytesArr = new Uint8Array(event.target.result);
      console.log('File bytes:', fileBytesArr);
      setfileBytes(fileBytesArr);
      // Дальнейшая обработка массива байт
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Account Change</h2>
          <div className="modal-buttons">
            <ArrowLeft style={{ cursor: 'pointer' }} onClick={() => setisEdit(false)} />
            <button className="close-button" onClick={() => setShowModal(false)}>
              X
            </button>
          </div>
        </div>
        <div className="modal-body-form">
          <label className="FilePhoto" style={{ cursor: 'pointer' }}>
            <div className="change-photo" style={{ backgroundImage: `url(${require('../../img/dora.jpg')})` }}>
              <input type="file" style={{ display: 'none' }} onChange={handleFileInput} />
              <img src={require('../../img/camera-icon.png')} />
            </div>
          </label>

          <div className="modal-change-input">
            <label>First Name</label>
            <input value={user.Name} type="text" />
          </div>

          <div className="modal-change-input">
            <label>UserName</label>
            <input value={user.Login} type="text" />
          </div>

          <input id="change-button" type="button" value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default EditModal;
