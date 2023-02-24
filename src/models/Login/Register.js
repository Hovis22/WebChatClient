

export default function Register({setisLogin}){
  

    return(
     <>

<div class="form-header"><h1>Register</h1></div>

<div class="form-block">

   <form action="">

     <div class="input-block">
        <label >Name</label>
        <input type="text"/>
     </div>


     <div class="input-block">
       <label >Email</label>
       <input type="text"/>
    </div>



     <div class="input-block">
       <label >Password</label>
       <input type="text"/>
    </div>

    <div class="input-block">
       <label>Confirm Password</label>
       <input type="text"/>
    </div>



   <button>Submit</button>

   
          <label className="reg-link">Don't have account?<span className="reg-linkbut"  onClick={()=>setisLogin(true)} >Create new account</span></label>
   
           </form>
   
        </div>
        </>
    )




}