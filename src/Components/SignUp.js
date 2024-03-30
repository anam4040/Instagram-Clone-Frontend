import React,{useEffect, useState, useSyncExternalStore}  from 'react'
import logo from "../img/logo.png"
import "./SignUp.css";
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';


export default function SignUp() {

  const redirect = useNavigate()

  const [nameUser, setName ] = useState("");
  const [emailUser, setEmail ] = useState("");
  const [userNameUser, setUserName ] = useState("");
  const [passwordUser, setPassword ] = useState("");


  const notifyO = (message) => toast.error(message);
  const notify1 = (message) => toast.success(message);

//Email and Password Validation using Regex

  const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passValidationRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

  const postData = () => {

   

    if(!emailValidationRegex.test(emailUser)){
      notifyO("Invalid email address")
      return
    }else if (!passValidationRegex.test(passwordUser)){
      notify1("Password must be of 6 characters or more and has at least 1 lowercase and 1 uppercase alphabetical character or has at least 1 lowercase and 1 numeric character or has at least 1 uppercase and 1 numeric character")
      return
    }

     
   //Data getting send to Server

   fetch(" https://instagram-clone-backend-vka1.onrender.com/signup", {
      method:"post",
      headers: {
         "Content-Type" : "application/json"
      },
      body:JSON.stringify({
         name:nameUser,
         userName:userNameUser,
         email:emailUser,
         password:passwordUser

      })
      

   }).then(res=>res.json())
   .then(data => {
      if(data.error){
         notifyO(data.error)
      }else{
         notify1(data.message)
         redirect("/signin")
      }
      
      
      console.log(data)
   })

  }



   
  return (
    <div className="signUp">
      <div className="form-container">

        <div className="form">
        <img className="signUpLogo" src={logo} alt="" />
         <p className="logInPara">
            Sign up to see photos and videos <br/>  from your friends
         </p>
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
            type="text" 
            name="name" 
            id="name"
            value={nameUser}
            placeholder="Full Name"
            onChange={(e)=>  {setName(e.target.value)}}
            />
         </div>

         <div>
            <input 
            type="text" 
            name="username" 
            id="username"
            value={userNameUser}
            placeholder="Username"
            onChange={(e)=>  {setUserName(e.target.value)}}
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
        
        <p className="signUpPara" 
           style={{ margin:"4px 0px" , fontSize:"12px", }}>
             People who use our services may have <br/> 
             uploaded your contact information <br/>
             to Instagram. Learn more
        </p> 

        <p className="signUpPara" 
           style={{ margin:"4px 0px" , fontSize:"12px", }}>
             By signing up, you agree to our terms, <br/> Privacy 
             Policy and
             Cookies Policy.
        </p>

        <input 
        type="submit"
        id="submit-btn"
        value="Sign Up"
        onClick={()=>{postData()}}
        />

        </div>

         <div className='formB'>
            Have an account?
            <Link to="/SignIn">
               <span style={{color: "blue", cursor: "pointer"}}>
                   Sign In
               </span>
            </Link>
           
         </div>

      </div>
    </div>
  )
}
