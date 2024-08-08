import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MainHomePage from "./pages/MainHomePage";
import SearchPage from "./pages/SearchPage";
import AlertPage from "./pages/AlertPage";
import Write from "./pages/Write";
import { Write2 } from "./pages/Write2";
import MyPage from "./pages/MyPage";
import ProfilePage from "./pages/ProfilePage";
import ChangeProfilePage from "./pages/ChangeProfilePage";
import DetailpostPage from "./pages/DetailpostPage";
import DetailMypostPage from "./pages/DetailMypostPage";
import { UpdatePostPage } from "./pages/UpdatePostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/mainhome" element={<MainHomePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/alert" element={<AlertPage />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/write2" element={<Write2 />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/profilepage" element={<ProfilePage />}></Route>
        <Route path="/changeprofile" element={<ChangeProfilePage />}></Route>
        <Route path="/detailmypost" element={<DetailMypostPage />}></Route>
        <Route path="/detailpost" element={<DetailpostPage />}></Route>
        <Route path="/updatepost" element={<UpdatePostPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
