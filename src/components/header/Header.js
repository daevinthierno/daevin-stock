import React from "react";
import "./header.css";

export default function Header({ user }) {
  return (
    <div className="header">
      <h1>Stock ForeCaster</h1>
      <div className="rigth_head">
        <h3> {user && user.displayName} </h3>
      </div>
    </div>
  );
}
