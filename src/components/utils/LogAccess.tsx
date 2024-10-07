import { MdErrorOutline } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useMenuContext } from "./Context/MenuContext";

function LogAccess() {
  //@ts-ignore
  const { isAccessLogVisible } = useMenuContext();

  return (
    <>
      <div className="log_access" style={{right: isAccessLogVisible ? "0" : "-300px",}}>
        <div className="title">Log Access</div>
        <div className="body">
          <div className="info error">
            <div className="icon">
              <MdErrorOutline />
            </div>
            <div className="body">
              <div className="title">Error</div>
              <div className="message">Satellite Liftoff Fails</div>
            </div>
          </div>
          <div className="info info_neutral">
            <div className="icon">
              <AiOutlineInfoCircle />
            </div>
            <div className="body">
              <div className="title">Info</div>
              <div className="message">The Internet is weak</div>
            </div>
          </div>
          <div className="info warning">
            <div className="icon">
              <IoWarningOutline />
            </div>
            <div className="body">
              <div className="title">Warning</div>
              <div className="message">Overheating in the engine</div>
            </div>
          </div>
          <div className="info success">
            <div className="icon">
              <AiOutlineCheckCircle />
            </div>
            <div className="body">
              <div className="title">Success</div>
              <div className="message">Satellite Liftoff Successful</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogAccess;
