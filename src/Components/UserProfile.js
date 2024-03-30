import React,{useEffect, useState} from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const{userid} = useParams();
  const[isFollow, setIsFollow] = useState(false);
  const[user, setUser] = useState("");
  const[posts, setPosts] = useState([]);
 
  // Function to follow user
  const followUser = (userId)=>{
    fetch(" https://instagram-clone-backend-vka1.onrender.com/follow",{
      method:"put",
      headers:{ 
        "Content-type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
    .then((res) =>res.json())
    .then((data)=>{
      console.log(data);
      setIsFollow(true);
    });
  }


// to unfollow user
const unfollowUser = (userId)=>{
  fetch(" https://instagram-clone-backend-vka1.onrender.com/unfollow",{
    method:"put",
    headers:{ 
      "Content-type":"application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body:JSON.stringify({
      followId: userId,
    }),
  })
  .then((res) =>{res.json()})
  .then((data)=>{
    console.log(data);
    setIsFollow(false);
  });
};





  useEffect(() => {
   fetch(` https://instagram-clone-backend-vka1.onrender.com/user/${userid}`, {
    headers:{ 
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },

   })
   .then((res) => res.json())
   .then((result) => {
     ;
      setUser(result.user);
      setPosts(result.posts);
      if (
        result.user && result.user.followers && localStorage.getItem("user")){
        const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
        if(result.user.followers.includes(loggedInUserId)){
          setIsFollow(true);
        }else{
          setIsFollow(false);
        }
      }else {
        setIsFollow(false);
      }
   });

  }, [isFollow]);

  return (
    <div className="profile">

      <div className="profile-content">

        <div className="profile-pic-wrapper">
          <img className="profile-pic" 
          src={user.Photo? user.Photo : picLink} alt=""/>
      </div>

        <div className="profile-data">

          <div 
          style={{
            display:"flex", 
            alignItems:"center", 
            justifyContent:"space-between", 
            }}>

          <h1>{user.name}</h1>

          <button className="followBtn" 
          onClick={()=>{
            if(isFollow){
              unfollowUser(user._id);
            }else{
              followUser(user._id);
            } 
          }}
          >
            {isFollow ? "Unfollow" : "Follow"}
          </button>
          </div>

           

           <div className="profile-information" style={{display:"flex"}} >
               <p>{posts?.length || "0"} posts</p>
               <p>{user.followers ? user.followers.length : "0"} followers</p>
               <p>{user.following ? user.following.length : "0"} following</p>
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
        {posts.map((pictures)=>{
          return(
            <img
             key={pictures._id}
             src={pictures.photo}
             //onClick={()=>{
              //toogleDetails(pics)
             // }}
             className="item"
            ></img>
          );
        })}

       </div>
  
     {/* { show && 
     <PostDetail item={posts} toogleDetails = {toogleDetails} />
     } */}

    </div>
  );
}
