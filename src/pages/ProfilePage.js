import { useEffect, useState } from "react";
import Header from "../component/Header";
import "../css/mypage.css";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState([
    {
      userId: "",
      userName: "",
      introduce: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/profilepage?uid=${searchParams.get("uid")}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((resp) => {
        setUserData(resp.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
      });
  }, [searchParams]);
  return (
    <>
      <div className="mypage">
        <Header />
        <div></div>
        <div className="mypage_main">
          <div className="mypage_profile">
            <img src="" height="180px" width="180px"></img>
            <div>
              <div>
                <p>{userData.id}</p>
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
            <div className="myposts_lists">
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
              <img src="" width="238px" height="238px"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
