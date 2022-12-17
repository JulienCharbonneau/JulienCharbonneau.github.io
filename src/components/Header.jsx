import React from "react";
import "./Header.css";

function Header() {
  return (
    <div style={{ height: 150, width: "100%", backgroundColor: "gray" }}>
      <header style={{ height: 150, width: "100%" }}>
        <img src="./R2.png" className="Logo" alt="Rocket Elevator logo" />
      </header>
    </div>
  );
}

export default Header;
