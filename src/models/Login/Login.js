import { useState } from "react"

export default function Login({setisLogin}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (login.trim() === "") {
      setError("Please enter your name");
      return;
    }
    if (password.trim() === "") {
      setError("Please enter your password");
      return;
    }

    const data = {
      "login": login,
      "password": password
    }

    fetch('https://localhost:7237/api/Form/login', {
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
        localStorage.setItem("User", e);
        window.location.reload();
      })
      .catch(error => {
        setError(error.message);
      });
  }

  return (
    <>
      <div className="form-header"><h1>Login</h1></div>

      <div className="form-block">
        <form action="">
          <div className="input-block">
            <label>Name</label>
            <input type="text" onChange={(event) => setLogin(event.target.value)} />
          </div>

          <div className="input-block">
            <label>Password</label>
            <input type="text" onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error && <div className="error">{error}</div>}

          <input type="button" onClick={handleLogin} value="Submit" />

          <label className="reg-link">Don't have account?<span className="reg-linkbut" onClick={() => setisLogin(false)}> Register</span></label>
        </form>
      </div>
    </>
  )
}
