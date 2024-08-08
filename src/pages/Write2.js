import { useState } from "react";
import "../css/write2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Write2({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
  });

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/write", formData, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((e) => {
        alert("게시글 작성이 완료되었습니다");
        window.location.reload();
        navigate("/mainhome");
      });
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <>
      <nav>
        <form onSubmit={handleSubmit}>
          <div className="write2">
            <div className="write2_title">
              <div>새 게시물 만들기</div>
              <button type="submit">올리기</button>
              <button onClick={handleCancel}>취소</button>
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
