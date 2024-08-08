import { useRef, useState } from "react";
import "../css/alertpage.css";
import SearchPage from "./SearchPage";

export default function AlertPage(props) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      props.toggleAlert();
    }
  };

  return (
    <>
      {isSearchActive && <SearchPage toggleSearch={toggleSearch} />}
      {!isSearchActive && (
        <div className="header">
          <div className="emozs">
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/instagram.png"
              width="36px"
              height="36px"
            ></img>

            <img
              src="http://localhost:3000/images/instagram_files/emoticone/home.png"
              width="24px"
              height="24px"
              onClick={props.toggleAlert}
            ></img>
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/search.png"
              width="24px"
              height="24px"
              onClick={toggleSearch}
            ></img>
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/heart2.png"
              width="24px"
              height="24px"
              onClick={props.toggleAlert}
            ></img>
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/plus.png"
              width="24px"
              height="24px"
            ></img>
            <img src="" width="24px" height="24px"></img>
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/menu.png"
              width="24px"
              height="24px"
            ></img>
          </div>
          <div className="alertbar">
            <div className="alertmenu">
              <p>알림</p>
            </div>
            <div className="alertfollow">
              <img
                src="http://localhost:3000/images/instagram_files/KakaoTalk_20240624_131902989.jpg"
                width="36px"
                height="36px"
              ></img>
              <p>ssuhyuen11님이 팔로우하기 시작하였습니다</p>
              <button>팔로우</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
