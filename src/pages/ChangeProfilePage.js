import { useState, useEffect } from "react";
import Header from "../component/Header";
import "../css/changeprofile.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import base64 from "base64-js";

export default function ChangeProfilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [userData, setUserData] = useState({
    uid: "",
    img: "",
    introduce: "",
    manWoman: "",
    userId: "",
    userName: "",
  });

  const [formData, setFormData] = useState({
    uid: "",
    introduce: "",
    manWoman: "",
  });

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // 미리보기 URL 생성
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    setUserData((prevData) => ({
      ...prevData,
      img: file,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/changeprofile", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((e) => {
        navigate("/mypage");
      });
  };

  const handleDeleteUser = (uid) => {
    const confirmDelete = window.confirm("회원 탈퇴를 하시겠습니까?");

    if (confirmDelete) {
      // 사용자가 확인을 누른 경우에만 회원 탈퇴 요청을 보냄
      axios
        .post(
          `http://localhost:8080/deleteUser`,
          { userUid: uid }, // 요청 본문에 userUid를 담아서 전송
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log("탈퇴되엇습니다:", response.data);
          navigate("/");
        });
    } else {
      // 사용자가 취소를 누른 경우
      console.log("회원 탈퇴 취소");
    }
  };

  return (
    <>
      <div className="changeprofile">
        <Header />
        <div className="changeprofilee_first">
          <form onSubmit={handleSubmit}>
            <div className="chageprofile_main">
              <div>프로필 편집</div>
              <div className="changepicture">
                <img
                  src={previewUrl || ""}
                  width="80px"
                  height="80px"
                  alt="Preview"
                ></img>
                <div>
                  <p>{userData.userId}</p>
                  <p>{userData.userName}</p>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={fileSelectedHandler}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  사진 변경
                </button>
              </div>
              <div className="changeintroduce">
                <div>소개</div>
                <textarea
                  name="introduce"
                  value={formData.introduce}
                  onChange={handlerInputChange}
                ></textarea>
              </div>
              <div className="changemanwoman">
                <div>성별</div>
                <select>
                  <option value="choose">선택</option>
                  <option value="main">남자</option>
                  <option value="woman">여자</option>
                </select>
              </div>
              <div className="information_form">
                <button>제출</button>
              </div>
              <div className="changeprofile_end">
                <div
                  onClick={() => {
                    handleDeleteUser(userData.uid);
                  }}
                >
                  회원탈퇴
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
