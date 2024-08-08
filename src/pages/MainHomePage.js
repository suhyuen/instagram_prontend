import { useEffect, useRef, useState } from "react";
import "../css/mainhomepage.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../component/Header";
import DetailpostPage from "./DetailpostPage";
import axios from "axios";

export default function MainHomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [postData, setPostData] = useState([
    {
      uid: "",
      user: { uid: "" },
      user: { userId: "" },
      createdAt: "",
      content: "",
      likesCount: "",
      liked: "",
      likes: { userLikes: "" },
    },
  ]);

  useEffect(() => {
    const postDto = {};

    axios
      .post("http://localhost:8080/selectposts", postDto, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setPostData(resp.data);
      });
  }, []);

  const handleLike = (uid) => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // Bearer 토큰에서 userUid 추출하기
    let userUid = null;
    if (accessToken && accessToken.startsWith("Bearer ")) {
      const token = accessToken.split(" ")[1];
      const tokenPayload = token.split(".")[1]; // JWT의 Payload 부분
      const decodedPayload = atob(tokenPayload); // Base64 디코딩
      const parsedPayload = JSON.parse(decodedPayload);
      userUid = parsedPayload.userUid; // 사용자 UID 추출
    }

    axios
      .post(
        `http://localhost:8080/post/${uid}/insertLikes`,

        {
          userUid: userUid,
          postUid: uid,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        const updatedPostData = postData.map((post) =>
          post.uid === uid ? { ...post, liked: !post.liked } : post
        );
        setPostData(updatedPostData);
      })
      .catch((error) => {
        alert("이미 게시글을 좋아합니다");
      });
  };

  // 로컬 스토리지에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  // Bearer 토큰인지 확인하고 필요한 정보 추출하기
  let loggedInUser = null;
  if (accessToken.startsWith("Bearer ")) {
    const token = accessToken.split(" ")[1];
    const tokenPayload = token.split(".")[1];

    // Base64 디코딩 후 JSON 파싱
    const decodedPayload = atob(tokenPayload);
    loggedInUser = JSON.parse(decodedPayload);
  }

  const boardList = postData.map((data) => {
    const postAuthorUid = data.user.uid;

    // 로그인 한 사용자의 uid와 게시글 작성자의 uid가 같은지 확인
    const isCurrentUserAuthor = loggedInUser.userUid === postAuthorUid;

    // 다른 링크 설정
    const detailLink = isCurrentUserAuthor
      ? `/detailmypost?uid=${data.uid}`
      : `/detailpost?uid=${data.uid}`;

    return (
      <div className="post" key={data.uid}>
        <div>
          <Link to="">
            <img
              src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
              width="36px"
              height="36px"
            ></img>
          </Link>
          <p>
            <Link to={`/profilepage?uid=` + data.user.uid}>
              {data.user.userId}
            </Link>
          </p>
          <p>{data.createdAt}</p>
        </div>
        <div>
          <img
            src="http://localhost:3000/images/instagram_files/KakaoTalk_20240620_174350614.jpg"
            width="519px"
            height="491px"
          ></img>
        </div>
        <div>
          <img
            src={
              data.liked
                ? "http://localhost:3000/images/instagram_files/emoticone/heart3.png"
                : "http://localhost:3000/images/instagram_files/emoticone/heart2.png"
            }
            width="24px"
            height="24px"
            onClick={() => handleLike(data.uid)}
            style={{ cursor: "pointer" }}
          ></img>

          <Link to={detailLink}>
            <img
              src="http://localhost:3000/images/instagram_files/emoticone/comment.png"
              width="24px"
              height="24px"
            ></img>
          </Link>
        </div>

        <div>{data.likesCount}명이 좋아합니다</div>
        <div>
          <p>
            <Link to="">{data.user.userId}</Link>
          </p>
          <p>{data.createdAt}</p>
          <p>{data.content}</p>
        </div>
        <div>
          <Link to={detailLink}>뎃글 00개 보기</Link>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="mainhome">
        <Header />
        <div className="mainposts">{boardList}</div>
      </div>
    </>
  );
}
