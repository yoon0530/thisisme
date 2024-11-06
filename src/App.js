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

    // 페이지 새로고침 시 로컬 스토리지에서 로그인 상태 복원
    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (storedUserName && storedIsLoggedIn) {
            setUserName(storedUserName);
            setIsLoggedIn(true);
        }
    }, []);

    // 로그인 핸들러
    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setUserName(name);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", name);
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        alert("로그아웃되었습니다.");
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
                    <Route path="/mypage" element={<PrivateRoute isLoggedIn={isLoggedIn}><MyPage /></PrivateRoute>}>
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
