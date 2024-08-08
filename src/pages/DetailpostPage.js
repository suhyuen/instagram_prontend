import "../css/detailpostpage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function DetailpostPage({ closeModal }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailPostData, setDetailPostData] = useState({
    uid: "",
    user: { userId: "" },
    createdAt: "",
    content: "",
  });

  const [formCommentData, setFormCommentData] = useState({
    userUid: "",
    postUid: "",
    content: "",
  });

  const [commentData, setCommentData] = useState([
    {
      user: { userId: "" },
      content: "",
      createdAt: "",
    },
  ]);

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormCommentData({
      ...formCommentData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/detailpost?uid=${searchParams.get("uid")}`)
      .then((resp) => {
        setDetailPostData(resp.data);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/detailpost/${parseInt(
          searchParams.get("uid")
        )}/commentwrite`,

        formCommentData,

        {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        window.location.reload();
      });
  };

  const commentList = commentData.map((data) => {
    return (
      <div className="comment_list">
        <div>
          <img
            src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
            height="60px"
            width="60px"
          ></img>
          <div>
            <p>{data.user.userId}</p>
            <p>{data.content}</p>
          </div>
          <div>{data.createdAt}</div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    axios
      .post(
        `http://localhost:8080/selectcomment?postUid=${searchParams.get("uid")}`
      )
      .then((resp) => {
        setCommentData(resp.data);
      });
  }, []);

  return (
    <>
      <nav>
        <div className="detailpost">
          <img
            src="http://localhost:3000/images/instagram_files/KakaoTalk_20240624_141003360.jpg"
            width="580px"
            height="921px"
          ></img>
          <div className="detailpost_main">
            <div className="post_profile">
              <img
                src="http://localhost:3000/images/instagram_files/KakaoTalk_20240624_131902989.jpg"
                height="60px"
                width="60px"
              ></img>
              <p>{detailPostData.user.userId}</p>
            </div>
            <div className="content">{detailPostData.content}</div>
            <div className="comment">
              <p>뎃글</p>
              {commentList}

              <div className="write_comment">
                <form onSubmit={handlesubmit}>
                  <textarea
                    name="content"
                    value={formCommentData.content}
                    onChange={handlerInputChange}
                  ></textarea>
                  <button type="submit">작성</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
