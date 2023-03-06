import { useState } from "react"


export default function Login({setisLogin}){
   const [login,setlogin]= useState("");
   const [password,setpassword]= useState("");

     
   function SendLogin() {
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
        .then(data => data.text())
        .then(e => {
          localStorage.setItem("User",e);
          window.location.reload();
        }
          )
        .catch(error => {
          console.error(error);
        });
    }



    return(
     <>

        <div className="form-header"><h1>Login</h1></div>

        <div className="form-block">
   
           <form action="">
   
             <div className="input-block">
                <label >Name</label>
                <input type="text"   onChange={(event) => setlogin(event.target.value)}      />
             </div>
   
             <div className="input-block">
               <label>Password</label>
               <input type="text"   onChange={(event) => setpassword(event.target.value)} />
            </div>
    
   
           <input type="button" onClick={SendLogin} value="Submit"/>
   
          <label className="reg-link">Allready Register?<span className="reg-linkbut"  onClick={()=>setisLogin(false)} > Login</span></label>
   
           </form>
   
        </div>
        </>
    )




}