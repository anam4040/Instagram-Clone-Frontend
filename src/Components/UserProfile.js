import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "./PostDetail";
import "./Profile.css";

export default function UserProfile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user && user.followers && localStorage.getItem("user")) {
      const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
      setIsFollow(user.followers.includes(loggedInUserId));
    } else {
      setIsFollow(false);
    }
  }, [user]);

  const fetchUserData = () => {
    fetch(`https://instagram-clone-backend-vka1.onrender.com/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.posts);
      });
  };

  const handleFollowToggle = () => {
    if (isFollow) {
      unfollowUser(user._id);
    } else {
      followUser(user._id);
    }
  };

  const followUser = (userId) => {
    fetch("https://instagram-clone-backend-vka1.onrender.com/follow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch("https://instagram-clone-backend-vka1.onrender.com/unfollow", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(false);
      });
  };

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-pic-wrapper">
          <img className="profile-pic" src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        <div className="profile-data">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1>{user.name}</h1>
            <button className="followBtn" onClick={handleFollowToggle}>
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-information" style={{ display: "flex" }}>
            <p>{posts.length || "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "80%",
          margin: "26px auto",
          opacity: "0.7",
        }}
      />
      <div className="profile-gallery">
        {posts.map((picture) => (
          <img key={picture._id} src={picture.photo} className="item" alt="" />
        ))}
      </div>
    </div>
  );
}
