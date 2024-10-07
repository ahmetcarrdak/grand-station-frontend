import { MdOutlineWidgets, MdOutlineWbSunny, MdSunny } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { useMenuContext } from "./Context/MenuContext";
import { useOpacityContext } from "./Context/OpacityContext"; // Eklediğiniz import
import {  NavLink } from "react-router-dom";
function Header() {
  const { isAccessLogVisible, setIsAccessLogVisible } = useMenuContext();
  const { opacity_dark, setOpacityDark } = useOpacityContext(); // Opacity context'ini kullan

  const handle_opacity = () => {
    setOpacityDark(!opacity_dark); // opacity_dark'ı güncelle
  };

  const handle_logAccess = () => {
    setIsAccessLogVisible((prev) => !prev);
  };

  return (
    <div className="header">
      <div className="header_items">
        <div className="header_item">
          <MdOutlineWidgets />
        </div>
        <div
          className="header_item"
          onClick={handle_logAccess}
          style={ isAccessLogVisible ? ({ color: "var(--led)" }) : ({color: "var(--text2)"})}
        >
          <BsInfoCircle />
        </div>
      </div>
      <div className="header_items">
        {opacity_dark ? (
          <div
            className="header_item"
            onClick={handle_opacity}
            style={{ color: "var(--led)" }}
          >
            <MdSunny />
          </div>
        ) : (
          <div className="header_item" onClick={handle_opacity}>
            <MdOutlineWbSunny />
          </div>
        )}

        <NavLink to={"/profile"} className={({ isActive }) => `header_item ${isActive ? "active" : ""}`}>
          <CgProfile />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
