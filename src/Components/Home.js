import React, {useEffect, useState} from "react";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

 //import { route } from "../../../backend/routes/auth";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const redirect = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  //Toasts functions 
  const notifyO = (message) => toast.error(message);
  const notify1 = (message) => toast.success(message);

  useEffect(() => {
    const jwttoken = localStorage.getItem("jwt");
    if(!jwttoken){
      redirect("./signup");
    }

    //Fetching all posts

    fetch("http://localhost:5000/allposts",{
      headers:{
        Authorization:"Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then((res)=>res.json())
    .then((result) => {
      
      setData(result);
    })
    .catch((err) => console.log(err));

  }, []);

  //to show and hide comments

  const toogleComment =(posts)=>{
    if(show){
      setShow(false);
      
    }else{
      setShow(true);
      setItem(posts); 
    }
  };

//Integrating Like post & unlike post Api

  const likePost =(id)=>{
     fetch("http://localhost:5000/like" , {
      method:"put",
      headers: {
        "Content-Type" : "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
     },
     body:JSON.stringify({
      postId:id,
     }),
   })
     .then((res)=>res.json())
     .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id == result._id){
          return result;
        } else{
          return posts;
        }
      });
      setData(newData);
      ;
   });
  };

  const unlikePost =(id)=>{
    fetch("http://localhost:5000/unlike" , {
     method:"put",
     headers: {
       "Content-Type" : "application/json",
       Authorization: "Bearer " + localStorage.getItem("jwt"), 
    },
    body:JSON.stringify({
     postId:id,
    }),
  })
  .then((res)=>res.json())
  .then((result)=>{
    const newData = data.map((posts)=>{
      if(posts._id == result._id){
        return result;
      } else{
        return posts;
      }
    });
    setData(newData);
     ;
  });
 };

 //Function for making comment

 const makeComment=(text, id)=>{
  fetch("http://localhost:5000/comment" , {
    method:"put",
    headers: {
      "Content-Type" : "application/json",
      Authorization:"Bearer " + localStorage.getItem("jwt"),
   },
   body:JSON.stringify({
    text: text,
    postId: id,
   }),
 })
   .then((res)=>res.json())
   .then((result)=>{
    const newData = data.map((posts)=>{
      if(posts._id == result._id){
        return result;
      } else{
        return posts;
      }
    });
    setData(newData);
    setComment("");
    notify1("Comment Posted");
    ;
 });
 };


  return (
     <div className="home">
      {data.map((posts) => { 
        return (
    <div className="card">

      <div className="card-header">

        <div className="card-pic">
          <img src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink } alt=""/>
        </div>

        <h4>

        <Link to={`/profile/${posts.postedBy._id}`}>
        {posts.postedBy.name}
        </Link>
        
        </h4>
  

    </div>

      <div className="card-image">
         <img  src={posts.photo} width={338} height={338} alt="" />
      </div>


      <div className="card-content">
       {posts.likes.includes(
        JSON.parse(localStorage.getItem("user"))._id
        ) ? ( 
        <span 
        className="material-symbols-outlined material-symbols-outlined-red" 
        onClick={()=>{
          unlikePost(posts._id);
        }}
        >
        favorite
        </span>

        ) : ( 

        <span 
          className="material-symbols-outlined" 
          onClick={()=>{likePost(posts._id)}}
          >favorite</span>)
       }

        

    

        <p>{posts.likes.length} Likes</p>

        <p>{posts.body}</p>

        <p style={{fontWeight:"bold", cursor:"pointer"}}
        onClick ={()=> {
          toogleComment(posts);
        }} 
        >
          View all comments
        </p>

      </div>


      <div className="add-comment">
        <span className="material-symbols-outlined">mood</span>
        <input 
        type="text" 
        placeholder="Add a comment" 
        value={comment} 
        onChange={(e)=>{ setComment(e.target.value);
        }}
        />
        <button className="comment"
               onClick={()=>{
                makeComment(comment, posts._id);
                }}
                 >
           Post 
        </button>
      </div>

    </div>
    );
    })}

   { /*show Comment*/ }
    { show && (
       <div className="showComment">
       <div className="container">
         <div className="postPic">
           <img src={item.photo} alt=""/>
         </div>
 
         <div className="details">
 
          {/* card header */}
          <div className="card-header" 
          style={{borderBottom:"1px solid #00000029 "}}
          >
 
            <div className="card-pic" >
            <img src={item.photo} alt=""/>
            </div>
            
            <h4>
              {item.postedBy.name}
            </h4>

          </div>
 
          {/* comment section */}
          <div className="comment-section" 
          style={{borderBottom:"1px solid #00000029 "}}>
            {item.comments.map((comment)=>{
              
               return ( <p className="comm">
                   <span className="commenter" style={{fontWeight:"bolder"}}>
                  {comment.postedBy.name}{""}
                    </span>
                   <span className="commentText">  
                   {comment.comment}</span>
                      </p>
                      );
              })
            }
          </div>
 
          {/* card content */}
          <div className="card-content">
          <p>{item.likes.length} Likes</p>
          <p>{item.body}</p>
          </div>
  
          {/* add-comment */}
         <div className="add-comment">
         <span className="material-symbols-outlined">mood</span>
         <input 
           type="text" 
           placeholder="Add a comment" 
           value={comment} 
           onChange={(e)=>{ setComment(e.target.value);
          }}
          />

         <button className="comment"
                 onClick={()=>{
                 makeComment(comment,item._id);
                 toogleComment();
                }} 
                 > 
            Post 
         </button>
         </div>
 
         </div>
       </div>

       <div className="close-comment" 
            onClick={()=>
            {toogleComment();
            }}
        >
       <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
       </span>
       </div>
     </div>
     )}
   
  </div>
  );
}
