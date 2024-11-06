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
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (storedUser && storedIsLoggedIn) {
            const user = JSON.parse(storedUser);
            setParsed(user);
            setUserName(user.name);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserName(user.name);
        setParsed(user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
    };

    const handleLogout = (showAlert = true) => {
        setIsLoggedIn(false);
        setUserName('');
        setParsed(null);
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

                    {/* 보호된 라우트 설정 */}
                    <Route path="/freeboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><FreeBoard /></PrivateRoute>} />
                    <Route path="/write" element={<PrivateRoute isLoggedIn={isLoggedIn}><WritePost userName={userName} /></PrivateRoute>} />
                    <Route path="/post/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><PostDetail userName={userName} /></PrivateRoute>} />
                    <Route path="/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditPost /></PrivateRoute>} />

                    {/* 마이페이지와 관련된 보호된 경로 */}
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
