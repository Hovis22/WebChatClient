import { useState } from "react"
import Login from "./Login";
import Register from "./Register";



export default function Forms(){
    const [isLogin,setisLogin] = useState(true);

    return(
        <div class="form-wrapper">


      
     {isLogin ? (
           <Login setisLogin={setisLogin} />
      ) : (
        <>
         <Register setisLogin={setisLogin}/>
       </>
      )}







        </div>





    )




}