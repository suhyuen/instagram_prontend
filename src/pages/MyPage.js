import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import "../css/mypage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    introduce: "",
    img: "",
  });

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/mypage",
        {},
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((resp) => {
        setUserData(resp.data);
      });
  });

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/myposts",
        {},
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((resp) => {
        setPostData(resp.data);
      }, []);
  });

  const boardList = postData.map((data) => {
    return (
      <div className="myposts_lists">
        <Link to={`/detailmypost?uid=` + data.uid}>
          <img
            src="http://localhost:3000/images/instagram_files/KakaoTalk_20240620_174350614.jpg"
            width="238px"
            height="238px"
          ></img>
        </Link>
      </div>
    );
  });
  return (
    <>
      <div className="mypage">
        <Header />
        <div></div>
        <div className="mypage_main">
          <div className="mypage_profile">
            <img
              src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
              height="180px"
              width="180px"
            ></img>
            <div>
              <div>
                <p>{userData.userId}</p>

                <button>
                  <Link to="/changeprofile">프로필 편집</Link>
                </button>
              </div>

              <div>
                <p>
                  이름 <span>{userData.userName}</span>
                </p>
              </div>
              <div className="introduce">
                <p>소개글</p>
                <div>{userData.introduce}</div>
              </div>
            </div>
          </div>
          <div className="mypage_posts">
            <div className="myposts">게시물</div>
            <div className="myposts_map">{boardList}</div>
          </div>
        </div>
      </div>
    </>
  );
}
