import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import styles from './App.module.css';
import MyPage from "./pages/MyPage";
import PointHistory from "./pages/PointHistory";
import PointExchange from "./pages/PointExchange";
import PointRecharge from "./pages/PointRecharge";
import PrivateRoute from "./components/PrivateRoute";
import FreeBoard from "./pages/FreeBoard";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";
import EditPost from "./pages/EditPost";

function App() {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [parsed, setParsed] = useState(null); // 사용자 정보 저장하는 상태 추가

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (storedUser && storedIsLoggedIn) {
            const user = JSON.parse(storedUser);
            setParsed(user); // parsed에 사용자 정보 설정
            setUserName(user.name);
            setIsLoggedIn(true);
        }
    }, []);

    // 로그인 핸들러
    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserName(user.name);
        setParsed(user); // 로그인 시 parsed 설정
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user)); // 사용자 정보 전체를 로컬 스토리지에 저장
    };

    // 로그아웃 핸들러, showAlert로 로그아웃 알림 메시지 표시 선택
    const handleLogout = (showAlert = true) => {
        setIsLoggedIn(false);
        setUserName('');
        setParsed(null); // 로그아웃 시 parsed 초기화
        localStorage.clear();
        if (showAlert) {
            alert("로그아웃되었습니다.");
        }
    };

    return (
        <BrowserRouter>
            <Nav className={styles.nav} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className={styles.body}>
                <Routes>
                    <Route path="/" element={<><HomePage /><Footer className={styles.footer} /></>} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<><SignupPage /><Footer className={styles.footer} /></>} />
                    <Route path="/freeboard" element={<FreeBoard />} />
                    <Route path="/write" element={<WritePost userName={userName} />} />
                    <Route path="/post/:id" element={<PostDetail userName={userName} />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                    <Route path="/mypage" element={<PrivateRoute isLoggedIn={isLoggedIn}><MyPage parsed={parsed} onLogout={() => handleLogout(false)} /></PrivateRoute>}>
                        <Route path="pointhistory" element={<PointHistory />} />
                        <Route path="pointexchange" element={<PointExchange />} />
                        <Route path="pointrecharge" element={<PointRecharge />} />
                    </Route>
                </Routes>
            </div>
            <Footer className={styles.footer} />
        </BrowserRouter>
    );
}

export default App;
