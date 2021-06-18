import React from "react";
import "./auth.css";

import image from "../../assets/images.jpeg";
import auth, { googleProvider } from "../../firebase";
import { Redirect } from "react-router";

function Auth() {
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(({ user }) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        // return <Redirect to="/home" />;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="auth">
      <div className="hero">
        <h1 className="hero_title">Welcome to our Stock forecaster</h1>
        <img className="hero_image" src={image} alt="hero image" />
        <button className="hero_button" onClick={signInWithGoogle}>
          SignIn
        </button>
      </div>
    </div>
  );
}

export default Auth;
