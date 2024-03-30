import React, {useContext , useEffect , useState} from "react"
import logo from "../img/logo.png";
import "./Navbar.css";
import {Link} from "react-router-dom";
import { signinContext } from "../context/signinContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({signin}) {
  const redirect = useNavigate()
  const {setShowModal} = useContext(signinContext)
  const [userid, setUserId] = useState ("")

  
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user"))?._id, localStorage.getItem("jwt"))
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))?._id}`, {
     headers:{ 
       Authorization: "Bearer " + localStorage.getItem("jwt"),
     },
 
    })
    .then((res) => res.json())
    .then((result) => {
       setUserId (result?.user?._id);
       localStorage.setItem("userDetails", JSON.stringify(result?.user));

       
    });
 
   }, [signin]);


 

  const  signinStatus = () => {
    const jwttoken = localStorage.getItem("jwt");
    if(signin || jwttoken) {
        return[
          <>
           <Link to="/">
          <li>Home</li>
          </Link>

          <Link to="/Create">
          <li> Create</li> 
          </Link>

          <Link to="/Profile">
          <li>Profile</li>
          </Link>   
          
          <Link style={{marginLeft:"20px"}} to={`/followingpost/${userid}`}>
          <li>Feed</li>
          </Link>

          <Link to={""}>
          <button className="navbarLogOutBtn" onClick={()=> setShowModal(true)
          }>
           Log Out
          </button>
          </Link>

          </>
        ]
    } else {
      return [
        <>
        <Link to="/SignUp">
        <li>SignUp</li>
        </Link>

        <Link to="/SignIn">
        <li>SignIn</li>
        </Link>

        </>
      ]
    }
  };
  
  const signinStatusMobile = ()=>{
   
      const jwttoken = localStorage.getItem("jwt");
      if(signin || jwttoken) {
          return[
            <>
             <Link to="/">
            <li><span class="material-symbols-outlined">
                       home
                </span>
            </li>
            </Link>
  
            <Link to="/Create">
            <li> <span class="material-symbols-outlined">
                  add_circle
                 </span>
            </li> 
            </Link>
  
            <Link to="/Profile">
            <li><span class="material-symbols-outlined">
                 account_circle
                </span>
            </li>
            </Link>   
            
            <Link style={{marginLeft:"20px"}} to={`/followingpost/${userid}`}>
            <li><span class="material-symbols-outlined">
                explore
               </span>
            </li>
            </Link>
  
            <Link to={""}>
            <li onClick={()=> setShowModal(true)
            }>
             <span class="material-symbols-outlined">
              logout
            </span>
            </li>
            </Link>
  
            </>
          ]
      } else {
        return [
          <>
          <Link to="/SignUp">
          <li>SignUp</li>
          </Link>
  
          <Link to="/SignIn">
          <li>SignIn</li>
          </Link>
  
          </>
        ]
      }
    
    
  }


  return (
  <div className="navbar">
    <img id="insta-logo" src={logo} alt="" style={{cursor:"pointer"}} onClick = {()=>{redirect("/")}} />

  <ul className="nav-menu">
        
    {signinStatus()}
  </ul>

  <ul className="nav-mobile">
        
        {signinStatusMobile()}
  </ul>

  </div>
  );
}
