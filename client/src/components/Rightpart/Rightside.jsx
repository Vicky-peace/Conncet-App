import React, { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import TrendCard from "../Trend/TrendCard";
import ShareModal from "../sharemodal/ShareModal";
import { Link } from "react-router-dom";
import "./rightside.css";

const Rightside = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightside">
      <div className="nav_icons">
        <Link to="/">
          {" "}
          <AiFillHome style={{ fontSize: "24px" }} />
        </Link>

        <FiSettings style={{ fontSize: "24px" }} />
        <AiOutlineBell style={{ fontSize: "24px" }} />
        <AiOutlineMessage style={{ fontSize: "24px" }} />
      </div>

      <TrendCard />

      <button
        className="button right-button"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default Rightside;
