import { useEffect, useRef, useState } from "react";
import SearchPage from "../pages/SearchPage";
import Write from "../pages/Write";
import { Write2 } from "../pages/Write2";
import AlertPage from "../pages/AlertPage";
import { Link } from "react-router-dom";
import "../css/mainhomepage.css";

export default function () {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isWriteActive, setIsWriteActive] = useState(false);
  const [isWrite2Active, setIsWrite2Active] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };
  const activateSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleAlert = () => {
    setIsAlertActive(!isAlertActive);
  };

  const toggleWrite = () => {
    setIsWriteActive(!isWriteActive);
  };

  const closeWritePage = () => {
    setIsWriteActive(false);
    setIsWrite2Active(false);
  };

  const closeWrite2Page = () => {
    setIsWrite2Active(false);
  };

  const onActivateWrite2 = () => {
    setIsWrite2Active(true);
    setIsWriteActive(false);
  };
  return (
    <>
      {isWriteActive && !isWrite2Active && (
        <div className="write-modal">
          <div className="write-content">
            <Write
              onActivateWrite2={onActivateWrite2}
              onClose={closeWritePage}
            />
          </div>
        </div>
      )}

      {isWrite2Active && (
        <div className="write-modal">
          <div className="write-content">
            <Write2
              onClose={closeWrite2Page}
              onActivateWrite2={onActivateWrite2}
            />
          </div>
        </div>
      )}

      {isSearchActive ? (
        <SearchPage toggleSearch={toggleSearch} />
      ) : (
        <>
          {isAlertActive ? (
            <AlertPage toggleAlert={toggleAlert} />
          ) : (
            <div className="mainheader">
              <div onClick={() => window.location.reload()}>instagram</div>

              <div>
                <ul>
                  <li>
                    <Link to="/mainhome">
                      <img
                        src="http://localhost:3000/images/instagram_files/emoticone/home.png"
                        width="24px"
                        height="24px"
                      ></img>
                      <p>홈</p>
                    </Link>
                  </li>
                  <li onClick={toggleSearch}>
                    <img
                      src="http://localhost:3000/images/instagram_files/emoticone/search.png"
                      width="24px"
                      height="24px"
                    ></img>
                    <p>검색</p>
                  </li>
                  <li onClick={toggleAlert}>
                    <img
                      src="http://localhost:3000/images/instagram_files/emoticone/heart.png"
                      width="24px"
                      height="24px"
                    ></img>
                    <p>알림</p>
                  </li>
                  <li onClick={toggleWrite}>
                    <img
                      src="http://localhost:3000/images/instagram_files/emoticone/plus.png"
                      width="24px"
                      height="24px"
                    ></img>
                    <p>만들기</p>
                  </li>
                  <li>
                    <Link to="/mypage">
                      <img
                        src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
                        width="24px"
                        height="24px"
                      ></img>
                      <p>프로필</p>
                    </Link>
                  </li>
                  <li>
                    <img
                      src="http://localhost:3000/images/instagram_files/emoticone/menu.png"
                      width="24px"
                      height="24px"
                    ></img>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
