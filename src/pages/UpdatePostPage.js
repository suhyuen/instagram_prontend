import { useEffect, useState } from "react";
import "../css/write2.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function UpdatePostPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    uid: searchParams.get("uid"),
    user: {
      userUid: "",
    },
    userUid: "",
    content: "",
  });

  const [postData, setPostData] = useState([
    {
      uid: "",
      user: {
        userUid: "",
      },
      content: "",
    },
  ]);

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:8080/detailpost?uid=${searchParams.get("uid")}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        setPostData(resp.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/updatepost?uid=${searchParams.get("uid")}`,
        formData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((e) => {
        alert("게시글이 수정되었습니다");
        navigate("/mainhome");
      });
  };

  return (
    <>
      <nav className="updatePost_nav">
        <form onSubmit={handleSubmit}>
          <div className="write2">
            <div className="write2_title">
              <div>게시글 수정</div>
              <button type="submit">올리기</button>
              <button>취소</button>
            </div>
            <div className="write2_image">
              <img
                src="http://localhost:3000/images/instagram_files/KakaoTalk_20240620_174350614.jpg"
                height="346px"
                width="654px"
              ></img>
            </div>
            <div className="write2_content">
              <textarea
                name="content"
                value={formData.content}
                onChange={handlerInputChange}
              ></textarea>
            </div>
          </div>
        </form>
      </nav>
    </>
  );
}
