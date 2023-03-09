import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Paperclip } from 'react-bootstrap-icons';
import { List, X } from 'react-bootstrap-icons';
import jwt_decode from 'jwt-decode';

function EditModal({ setShowModal, setisEdit }) {
  let user = jwt_decode(localStorage.getItem('User'));

  const [image, setImage] = useState(null);
  const imageChange = useRef(user.Image);
  const [fileBytes, setfileBytes] = useState(null);
  const login = useRef(user.Login);
  const name = useRef(user.Name);
  const [errors, setErrors] = useState({});


  const validate = () => {
    let newErrors = {};
    if (name.current.value.length < 4) {
      newErrors.name = 'Name must be at least 4 characters long';
    }
    if (login.current.value.length < 4) {
      newErrors.login = 'Username must be at least 4 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


 useEffect(()=>{
  console.log(fileBytes);
  if(fileBytes!=null){
    setImage(new Blob([fileBytes]));
    console.log(image);
  }
 },[fileBytes])

  
  useEffect(()=>{
     if(user!=null){
      login.current.value = user.Login;
      name.current.value = user.Name;
      setImage(user.Image);
     }
  },[user])

  useEffect(()=>{
    console.log(imageChange);
 },[imageChange])

 useEffect(()=>{
    console.log(image);
 },[image])




  const handleFileInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const bytes = new Uint8Array(e.target.result);
      setfileBytes(bytes);
      setPhotoBackground(bytes);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  const setPhotoBackground = (bytes) => {
    const base64String = btoa(String.fromCharCode.apply(null, bytes));
    const changePhotoElement = document.querySelector('.change-photo');
    changePhotoElement.style.backgroundImage = `url(data:image/png;base64,${base64String})`;
  };
  
  


  const handleSubmit = () => {
 
      if(!validate()){
        return;
      };


    const data = {
      "Id": user.Id,
      "Name":  name.current.value,
      "Login":  login.current.value
    }

    const formData = new FormData();
    formData.append('file', new Blob([fileBytes]), 'filename.bin');
    formData.append('data', JSON.stringify(data));


    fetch('https://localhost:7237/api/Form/UserEdit', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(error => {
          throw new Error(error);
        });
      }
      return response.text();
    })
      .then(e => {
    user =  localStorage.setItem("User",e);

      }
        )
      .catch(error => {
        
        console.error(error);
      });
  }



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
            <div className="change-photo" style={{ backgroundImage: `url(data:image/png;base64,${user.Image})` }}>
              <input type="file" style={{ display: 'none' }} onChange={handleFileInput} />
              <img src={require('../../img/camera-icon.png')} />
            </div>
          </label>

          <div className="modal-change-input">
            <label>First Name</label>
            <input ref={name} type="text"   />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="modal-change-input">
            <label>UserName</label>
            <input ref={login}    type="text" />
             {errors.login && <div className="error">{errors.login}</div>}
          </div>
      
          <input id="change-button" type="button" value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default EditModal;
