import { useState } from "react";
import "../css/signuppage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    userName: "",
    userId: "",
    userPw: "",
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
      .post("http://localhost:8080/signup", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((e) => {
        navigate("/");
      });
  };
  return (
    <>
      <nav>
        <form onSubmit={handleSubmit}>
          <div className="signup">
            <div>instagram</div>
            <div className="signup_list">
              <p>휴대폰번호</p>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div className="signup_list">
              <p>이름</p>
              <input
                name="userName"
                value={formData.userName}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div className="signup_list">
              <p>아이디</p>
              <input
                name="userId"
                value={formData.userId}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div className="signup_list">
              <p>비밀번호</p>
              <input
                type="password"
                name="userPw"
                value={formData.userPw}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div>
              <button>회원가입</button>
            </div>
          </div>
        </form>
        <div className="signup_last">
          <p>계정이 있으신가요?</p>
          <Link to="/">
            <div>로그인</div>
          </Link>
        </div>
      </nav>
    </>
  );
}
