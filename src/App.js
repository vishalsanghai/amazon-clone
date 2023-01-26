import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Checkout from "./screens/Checkout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // This will only run when the component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      if(authUser){
        // The user just logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }else{
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/" element={<><Header /><Home /></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
