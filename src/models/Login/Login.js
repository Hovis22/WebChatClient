


export default function Login({setisLogin}){
  

    return(
     <>

        <div className="form-header"><h1>Login</h1></div>

        <div className="form-block">
   
           <form action="">
   
             <div className="input-block">
                <label >Name</label>
                <input type="text"/>
             </div>
   
             <div className="input-block">
               <label>Password</label>
               <input type="text"/>
            </div>
    
   
           <button>Submit</button>
   
          <label className="reg-link">Allready Register?<span className="reg-linkbut"  onClick={()=>setisLogin(false)} > Login</span></label>
   
           </form>
   
        </div>
        </>
    )




}