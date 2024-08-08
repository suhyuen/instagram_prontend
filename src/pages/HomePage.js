import "../css/homepage.css";
import "../css/font.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      .post("http://localhost:8080/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        localStorage.setItem(
          "accessToken",
          response.headers.get("Authorization")
        );

        navigate("/mainhome");
      })
      .catch(() => {
        alert("아이디 비밀번호를 확인해 주세요.");
      });
  };
  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <div className="homepage">
          <div className="imag1">
            <img
              src="http://localhost:3000/images/instagram_files/screenshot1.png"
              width="280px"
              height="580px"
            ></img>
          </div>
          <div className="imag2">
            <img
              src="http://localhost:3000/images/instagram_files/screenshot2.png"
              width="280px"
              height="580px"
            ></img>
          </div>
          <div className="login_list">
            <div>instagram</div>
            <div className="idpw">
              <p>id</p>
              <input
                name="username"
                value={formData.username}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div className="idpw">
              <p>pw</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div>
              <button>로그인</button>
            </div>
            <div>
              <div className="line">또는</div>
            </div>
            <div>
              <button>
                <Link to="/signup">회원가입</Link>
              </button>
            </div>
            <div>비밀번호를 잊으셨나요?</div>
          </div>
        </div>
      </form>
    </nav>
  );
}
