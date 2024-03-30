import React,{useEffect, useState} from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const[picture, setPicture] = useState([]);
  const[show, setShow] = useState(false);
  const[posts, setPosts] = useState([]);
  const[user, setUser] = useState("");
  const[changePic, setChangePic] = useState(false);
  
  
  const toogleDetails =(posts)=>{
    if(show){
      setShow(false);
      
    }else{
      setShow(true);
      setPosts(posts); 
    }
  };

  const changeprofile = ()=>{
    if(changePic){
      setChangePic(false)
    }else{
      setChangePic(true)
    }
  }
  


  useEffect(() => {
   fetch(` https://instagram-clone-backend-vka1.onrender.com/user/${JSON.parse(localStorage.
   getItem("user"))._id}`, {
    headers:{ 
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },

   })
   .then((res) => res.json())
   .then((result) => {
      ;
      setPicture(result?.posts);
      setUser(result?.user)
      console.log(picture);
   });

  }, []);


  return (
    <div className="profile-bg">
    <div className="profile">

      <div className="profile-content">

        <div className="profile-pic-wrapper">
          <img className="profile-pic"
          onClick={changeprofile} 
          src={user.Photo? user.Photo : picLink}
          alt=""/>
      </div>

        <div className="profile-data">

           <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>

           <div className="profile-information" style={{display:"flex"}} >
               <p>{picture ? picture.length : "0"} posts</p>
               <p>{user.followers ? user.followers.length : "0" } followers</p>
               <p>{user.following ? user.following.length : "0" } following</p>
           </div>

        </div>

      </div>
      

      <hr style={{
          width:"80%",
          margin:"26px auto",
          opacity:"0.7",
        }}
      />


       <div className="profile-gallery">

       {picture?.map((pictures) => {
         return <img key={pictures._id} 
                     src={pictures.photo} 
                     onClick={() => {
                      toogleDetails(pictures)
                     }}
                     className="item"
                     ></img>
       })}

       </div>
  
     { show && 
     <PostDetail item={posts} toogleDetails = {toogleDetails} />
     }
      {
        changePic &&
        <ProfilePic  changeprofile={changeprofile} />
      }

    </div>
    </div>
  );
}
