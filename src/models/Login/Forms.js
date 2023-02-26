import { useState } from "react"
import Login from "./Login";
import Register from "./Register";



export default function Forms(){
    const [isLogin,setisLogin] = useState(true);
   console.log(123);
    return(
        <div className="form-wrapper">


      
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