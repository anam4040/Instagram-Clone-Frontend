import React,{useState, useEffect} from "react";
import "./Create.css";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

export default function Create() {

const [body, setBody] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("");
const[user, setUser] = useState("");



var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

const redirect = useNavigate()

//Toast Functions(its the alphabet O not zero in notifyO)
const notifyO = (message) => toast.error(message);
const notify1 = (message) => toast.success(message);



useEffect(() => {
  const userData = localStorage.getItem("userDetails");
setUser(JSON.parse(userData));
 }, [localStorage]);



useEffect(() =>{

  //Saving post into MongoDB
  if(url) {
    fetch("http://localhost:5000/create",{
      method:"post",
      headers:{
        "Content-type": "application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:url
      })
     }).then (res => res.json())
      .then (data => {
        if (data.error) {
        notifyO(data.error)
      } else {
        notify1("Posted Successfully")
        redirect("/")
      }
    })
      .catch(err => console.log(err))
  }

}, [url])

// Posting image to Cloudinary

const postDetails = ()=>{

  console.log(body, image)
  const data = new FormData()
  data.append("file", image)
  data.append("upload_preset", "instagramcapstone")
  data.append("cloud_name", "instagram-capstone")

  fetch("https://api.cloudinary.com/v1_1/instagram-capstone/image/upload",
  {
    method: "post",
    body: data,
  }).then((res) => res.json())
    .then((data) => setUrl(data.url))
    .catch ((err) => console.log(err))
  
}


    const loadfile = (event)=>{

            
            var output = document.getElementById("output");        
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function() {
              URL.revokeObjectURL(output.src) ;

          
          };
          };
        

  return (
    <div className="create-bg">
    <div className="create">
      
     <div className = "create-header">

         <h4 style={{margin: "4px auto"}}>Create new Post</h4>
          
     </div>

          

     
      <div className="first-div"> 
        
        <img id="output"  src="https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png" />

        <input type="file" 
               accept="image/*" 
               onChange= {(event)=>{loadfile(event);
              setImage(event.target.files[0])
              }}
        />

      </div>


     <div className="userDetails">

        <div className="social-card-header">

          {/* <div className= "social-card-pic">
            <img src="https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={45} height={45} alt=""/>
          </div> */}

          <div className= "social-card-pic">
          <img className="profile-pic" 
          src={user.Photo ? user.Photo : picLink} alt=""/>
          </div>

        


           <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>

           {/* <h5>Anam</h5> */}


        </div>

         <textarea value={body} onChange={(e)=>{
          setBody(e.target.value)
         }} type="text" placeholder="Write a caption......" >

         </textarea>

         <div className="PostButton">
         <button id="Post-btn" onClick={()=>{postDetails()}}>Post</button> 
         </div>

     </div>

    </div>
    </div>
  );
}
