import React from 'react';
import "./PostDetail.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostDetail({item, toogleDetails}) {

 const redirect = useNavigate();

 //Toasts functions 
 const notifyO = (message) => toast.error(message);
 const notify1 = (message) => toast.success(message);


  const removePost = async (postId)=>{
    if(window.confirm("Do you really want to delete this post?")){
       
      const res = await   fetch(`http://localhost:5000/deletePost/${postId}`, {
            method:"delete",
            headers: {
                "Content-Type" : "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
             },
         })
         const result = await  res.json()
         console.log("result");
         toogleDetails ();
         redirect("/")
         notify1(result.message);

         
    }
  };

  return (
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
 
            <h4>{item.postedBy.name}</h4>

            <div className="deletePost" onClick={()=>{removePost(item._id)}}>
            <span className="material-symbols-outlined">delete</span>

            </div>

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
           //value={comment} 
           //onChange={(e)=>{ setComment(e.target.value);
          //}}
          />

         <button className="comment"
                 //onClick={()=>{
                 //makeComment(comment,item._id);
                // toogleComment();
               // }} 
                 > 
            Post 
         </button>
         </div>
 
         </div>
       </div>

       <div className="close-comment" 
            onClick={()=>
            {toogleDetails();
            }}
        >
       <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
       </span>
       </div>
     </div>
  )
}
