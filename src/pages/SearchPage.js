import { useEffect, useRef, useState } from "react";
import "../css/searchpage.css";
import { Link } from "react-router-dom";
import AlertPage from "./AlertPage";
import axios from "axios";

export default function SearchPage({ toggleSearch }) {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [searchId, setSearchId] = useState(""); // 검색어 상태 관리
  const [searchResults, setSearchResults] = useState([
    {
      userId: "",
    },
  ]); // 검색 결과 상태
  const [userData, setUserData] = useState([
    {
      userId: "",
    },
  ]);

  const toggleAlert = () => {
    setIsAlertActive(!isAlertActive);
    if (isAlertActive) {
      toggleSearch();
    }
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/selectUser",
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        console.log("User data:", resp.data);
      });
  }, []);

  useEffect(() => {
    // 검색어가 업데이트 될 때마다 서버에 요청
    if (searchId) {
      axios
        .post("http://localhost:8080/selectUserId", { userId: searchId })
        .then((resp) => {
          console.log("Search results:", resp.data);
          setSearchResults(Array.isArray(resp.data) ? resp.data : []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // 오류 처리
        });
    }
  }, [searchId]); // searchId가 변경될 때마다 실행

  const handleInputChange = (event) => {
    setSearchId(event.target.value); // 입력값을 상태에 저장
  };

  return (
    <>
      {isAlertActive && <AlertPage toggleAlert={toggleAlert} />}
      {!isAlertActive && (
        <div className="header">
          <div className="emozs">
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/instagram.png"
              width="36px"
              height="36px"
              onClick={toggleSearch}
            ></img>

            <img
              src="http://localhost:3000/images/instagram_files/emoticone/home.png"
              width="24px"
              height="24px"
              onClick={toggleSearch}
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
              onClick={toggleAlert}
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
          <div className="searchbar">
            <div className="searchinput">
              <p>검색</p>
              <input
                type="text"
                placeholder="검색"
                className="search-input"
                value={searchId} // 입력값을 상태와 연결
                onChange={handleInputChange} // 입력값 변경 시 처리
              ></input>
            </div>
            <div className="searchprofile">
              {searchResults.length > 0 ? (
                searchResults.map((user, index) => (
                  <div key={index}>
                    <img
                      src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
                      width="36px"
                      height="36px"
                      alt={user.userId}
                    />
                    <p>{user.userId}</p>
                  </div>
                ))
              ) : (
                <p>사용자를 찾을 수 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
