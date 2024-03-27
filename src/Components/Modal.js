import React from 'react';
import {RiCloseLine} from "react-icons/ri";
import "./Modal.css";
import { useNavigate } from 'react-router-dom';

export default function Modal({setShowModal}) {
  
    const redirect = useNavigate()
  
 return (


 <div className="darkBackground" onClick={() => setShowModal(false)}>    
    <div className="center">
     <div className="Modal">
    
    <div className="modalHeader">
      <h4 className="heading">Confirm</h4>
    </div>

    <button className="close-btn" onClick={() => setShowModal(false)} >
     <RiCloseLine></RiCloseLine>
    </button>

    {/*modal content*/}
    <div className="modalContent">
      Are you sure you want to log out ?
    </div>

    <div className="modalActions">
      <div className="modalContainer">
          <button className="LogOutBtn" onClick={() => {
            setShowModal(false);
            localStorage.clear()
            redirect("./signin")
          }}> Log Out</button>
          <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>

    </div>
  </div>
</div>

  

    
  )
}
