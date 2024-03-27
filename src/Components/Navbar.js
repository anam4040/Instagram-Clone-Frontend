import React, {useContext , useEffect , useState} from "react"
import logo from "../img/logo.png";
import "./Navbar.css";
import {Link} from "react-router-dom";
import { signinContext } from "../context/signinContext";

export default function Navbar({signin}) {

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
       setUserId(result?.user?._id);

       
    });
 
   }, [signin]);


 

  const  signinStatus = () => {
    const jwttoken = localStorage.getItem("jwt")
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
          Feed
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
  

  return (
  <div className="navbar">
    <img src={logo} alt="" />

  <ul className="nav-menu">
        
    {signinStatus()}
  </ul>

  </div>
  );
}
