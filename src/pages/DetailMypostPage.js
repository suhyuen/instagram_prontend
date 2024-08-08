import "../css/detailpostpage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function DetailMypostPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailPostData, setDetailPostData] = useState({
    uid: "",
    user: { userId: "" },
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
      .post(`http://localhost:8080/detailpost?uid=${searchParams.get("uid")}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setDetailPostData(resp.data);
      });
  }, []);

  const handleDeletePost = (uid) => {
    const confirmDelete = window.confirm("게시글을 삭제 하시겠습니까?");

    if (confirmDelete) {
      axios
        .post(
          `http://localhost:8080/deletepost`,
          { uid },
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          alert("삭제되었습니다:", response.data);
          navigate("/mainhome");
        });
    } else {
      // 사용자가 취소를 누른 경우
      alert("취소하였습니다");
      navigate("/mainhome");
    }
  };

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
      <nav className="detailpost_nav">
        <div className="detailpost">
          <img
            src="http://localhost:3000/images/instagram_files/KakaoTalk_20240620_174350614.jpg"
            width="580px"
            height="921px"
          ></img>
          <div className="detailpost_main">
            <div className="post_profile">
              <img
                src="http://localhost:3000/images/instagram_files/KakaoTalk_20240412_145407515.jpg"
                height="60px"
                width="60px"
              ></img>
              <p>{detailPostData.user.userId}</p>

              <button>
                {" "}
                <Link to={`/updatepost?uid=${detailPostData.uid}`}>수정</Link>
              </button>

              <button
                type="button"
                id="detailpost-delete"
                onClick={() => {
                  handleDeletePost(detailPostData.uid);
                }}
              >
                삭제
              </button>
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

                  <button>작성</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
