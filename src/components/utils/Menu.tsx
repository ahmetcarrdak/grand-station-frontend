import { Component } from "react";
import Header from "./Header";
import { LiaSatelliteDishSolid } from "react-icons/lia";
import { RiHome6Line } from "react-icons/ri";
import { BsDatabase } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default class Menu extends Component {
  render() {
    const logOut = () => {
      //return false;
      alert("Çıkış");
    };

    return (
      <>
        <Header />
        <div className="menu">
          <div className="menu_item">
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <RiHome6Line />
              <div className="menu_icon_text">Home</div>
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink
              to={"/stallite"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LiaSatelliteDishSolid />
              <div className="menu_icon_text">satellite</div>
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink
              to={"/data"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <BsDatabase />
              <div className="menu_icon_text">Database</div>
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink
              to={"/note"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <CgNotes />
              <div className="menu_icon_text">Notes</div>
            </NavLink>
          </div>
          <div className="menu_item">
            <div onClick={logOut}>
              <IoIosLogOut />
              <div className="menu_icon_text">Logout</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
