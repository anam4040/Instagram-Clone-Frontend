import React, {useState, useContext} from "react";
import "./SignIn.css";
import logo from "../img/logo.png";
import {Link, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { signinContext } from "../context/signinContext";

export default function SignIn() {

   const{setUserLogin}=useContext(signinContext)

  const redirect = useNavigate()

  const [emailUser, setEmail ] = useState("");
  const [passwordUser, setPassword ] = useState("");

  //Toast functions O (Its the alphabe O and not zero), A
  const notifyO = (message) => toast.error(message);
  const notify1 = (message) => toast.success(message);

  const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const postData = () => {

    if(!emailValidationRegex.test(emailUser)){
      notifyO("Invalid email address")
      return
    }
  

     
   //Data sending to Server while signing in

   fetch("http://localhost:5000/signin", {
      method:"post",
      headers: {
         "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        
         email:emailUser,
         password:passwordUser

      })
      

   }).then(res=>res.json())
   .then(data => {
      if(data.error){
         notifyO(data.error)
      }else{
         notify1("Signed In Successfully")
         console.log(data)
         localStorage.setItem("jwt", data.jwttoken) 
         localStorage.setItem("user",JSON.stringify(data.user))
         setUserLogin(true)
         redirect("/")
      }
      
      
      console.log(data)
   })

  }

  return (
    <div className="signIn">
      <div>
        <div className="loginForm"> 
           <img className="signUpLogo" src={logo} alt="" />
           <div>
           <input 
            type="email" 
            name="email" 
            id="email"
            value={emailUser}
            placeholder="Email"
            onChange={(e)=>  {setEmail(e.target.value)}}
            />

           </div>

           <div>
           <input 
            type="password" 
            name="password" 
            id="password"
            value={passwordUser}
            placeholder="Password"
            onChange={(e)=>  {setPassword(e.target.value)}}
            />

           </div>
          
            <input type="submit"  
            id="login-btn" 
            onClick={()=>{postData()}}
            value="Sign In" 
            />

        </div>

        <div className="loginFormB">
            Don't have an account?
            <Link to="/signup">
            <span style={{color: "blue", cursor:"pointer"}}>Sign Up</span>
            </Link>
           
        </div>
      </div>
    </div>
  )
}
