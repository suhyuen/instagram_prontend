import { Link } from "react-router-dom";
import "../css/write.css";
import { useRef, useState } from "react";

export default function Write({ onActivateWrite2, onClose }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleCancle = () => {
    onClose();
  };

  const handleNext = () => {
    onActivateWrite2();
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // 미리보기 URL 생성
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <>
      <nav>
        <div className="write">
          <div className="title">
            <div>새 게시물 만들기</div>
            <div onClick={handleNext}>다음</div>
            <div onClick={handleCancle}>취소</div>
          </div>
          <div className="chooseCP">
            <div>
              <img
                src="http://localhost:3000/images/instagram_files/emoticone/겔러리 아이콘.png"
                width="80px"
                height="80px"
              ></img>
              <img
                src="http://localhost:3000/images/instagram_files/emoticone/동영상.png"
                width="80px"
                height="80px"
              ></img>
            </div>
            <div>사진과 동영상을 여기다 끌어다 놓으세요</div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={fileSelectedHandler}
            />
            <div>
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
              >
                컴퓨터에서 선택
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
