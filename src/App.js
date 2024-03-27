import logo from './logo.svg';
import React , {createContext, useState} from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './Components/Create';
import Profile from './Components/Profile';
import { signinContext } from './context/signinContext';
import Modal from "./Components/Modal";
import UserProfile from './Components/UserProfile';
import MyFollowingPost from './Components/MyFollowingPost';

function App() {
  
  const [ userLogin, setUserLogin] = useState(false)
  const [ showModal, setShowModal] = useState(false)

  
  return (
   <BrowserRouter>

    <div className="App">
       
    <signinContext.Provider value={{setUserLogin, setShowModal}} >

    <Navbar signin = {userLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/Create" element={<Create/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/profile/:userid" element={<UserProfile/>}></Route>
        <Route path="/followingpost/:userid" element={<MyFollowingPost/>}></Route>
      </Routes>

      <ToastContainer theme="light"/>
      {showModal && <Modal setShowModal ={setShowModal}></Modal> }

    </signinContext.Provider>
  
      

      

    </div>
   </BrowserRouter> 
  );
}

export default App;
