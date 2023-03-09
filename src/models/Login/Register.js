import { useState } from "react"


export default function Register({setisLogin}){
  const [login,setlogin] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [confpassword,setconfpassword] = useState('');
  const [error, setError] = useState('');

  function SendRegister() {
    if (!login || !email || !password || !confpassword) {
      setError('Please fill in all fields');
      return;
    }
  
    if (password !== confpassword) {
      setError('Passwords do not match');
      return;
    }

    if(login.length < 4){
      setError('Name Length > 3');
      return;
    }

  
    let data = {
      "login": login,
      "email": email,
      "password": password
    };
  
    fetch('https://localhost:7237/api/Form/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
        console.log(e);
        localStorage.setItem("User", e);
        window.location.reload();
      })
      .catch(error => {
        setError(error.message);
      });
  }

  function handleInputChange(event, setInput) {
    setInput(event.target.value);
    setError('');
  }

  return (
    <>
      <div className="form-header"><h1>Register</h1></div>

      <div className="form-block">
        <form action="">
          <div className="input-block">
            <label>Name</label>
            <input onChange={(event) => handleInputChange(event, setlogin)} type="text" value={login} />
          </div>

          <div className="input-block">
            <label>Email</label>
            <input onChange={(event) => handleInputChange(event, setemail)} type="text" value={email} />
          </div>

          <div className="input-block">
            <label>Password</label>
            <input onChange={(event) => handleInputChange(event, setpassword)} type="password" value={password} />
          </div>

          <div className="input-block">
            <label>Confirm Password</label>
            <input onChange={(event) => handleInputChange(event, setconfpassword)} type="password" value={confpassword} />
          </div>

          {error && <div className="error">{error}</div>}

          <input type="button" onClick={SendRegister} value="Submit"/>

          <label className="reg-link">Already Registered?<span className="reg-linkbut"  onClick={() => setisLogin(true)}>Login</span></label>
        </form>
      </div>
    </>
  );
}
