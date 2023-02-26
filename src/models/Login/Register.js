import { useState } from "react"


export default function Register({setisLogin}){
  const [login,setlogin] =useState();
  const [email,setemail] =useState();
  const [password,setpassword] =useState();
  const [confpassword,setconfpassword] =useState();



     
  function SendRegister() {
   const data = {
     "login": login,
     "email":email,
     "password": password
   }

   fetch('https://localhost:7237/api/Form/register', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
     .then(data => data.text())
     .then(e => {
      console.log(e);
       localStorage.setItem("User",e);

     }
       )
     .catch(error => {
       console.error(error);
     });
 }





    return(
     <>

<div class="form-header"><h1>Register</h1></div>

<div class="form-block">

   <form action="">

     <div class="input-block">
        <label >Name</label>
        <input onChange={(event) => setlogin(event.target.value)} type="text"/>
     </div>


     <div class="input-block">
       <label >Email</label>
       <input onChange={(event) => setemail(event.target.value)} type="text"/>
    </div>



     <div class="input-block">
       <label >Password</label>
       <input onChange={(event) => setpassword(event.target.value)} type="text"/>
    </div>

    <div class="input-block">
       <label>Confirm Password</label>
       <input onChange={(event) => setconfpassword(event.target.value)} type="text"/>
    </div>



    <input type="button" onClick={SendRegister} value="Submit"/>


   
          <label className="reg-link">Don't have account?<span className="reg-linkbut"  onClick={()=>setisLogin(true)} >Create new account</span></label>
   
           </form>
   
        </div>
        </>
    )




}