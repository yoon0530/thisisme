import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        pw: '',
    });
    const navigate = useNavigate();

    const handleInfo = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const gotoSignup = () => navigate('/signup');

    const loginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users');

            if (!response.ok) {
                throw new Error('데이터를 가져오는 데 실패했습니다.');
            }

            const users = await response.json();
            const user = users.find(
                (user) => user.email === loginInfo.email && user.password === loginInfo.pw
            );

            if (user) {
                // 전체 사용자 정보를 로컬 스토리지에 저장
                localStorage.setItem('user', JSON.stringify(user)); // 전체 user 객체 저장
                localStorage.setItem('Token', 'mockAccessToken'); // 모의 토큰 설정

                // 부모 컴포넌트에 전체 user 객체 전달
                if (onLogin) onLogin(user);

                // 로그인 상태 변경을 감지하도록 이벤트 트리거
                window.dispatchEvent(new Event("storage"));

                alert('로그인에 성공하였습니다!');
                navigate('/'); // 메인 페이지로 이동
            } else {
                alert('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <form className="login">
            <div className="loginTitle">로그인</div>
            <input
                className="loginBox"
                type="text"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={loginInfo.email}
                onChange={handleInfo}
                required
            />
            <input
                className="loginBox"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="pw"
                value={loginInfo.pw}
                onChange={handleInfo}
                required
            />
            <div className="checkId">
                <AiOutlineCheckCircle className="checkBtn" />
                <span className="checkIdSave">아이디 저장</span>
            </div>
            <button className="btnLogin" onClick={loginClick}>
                로그인
            </button>
            <button type="button" className="btnSignup" onClick={gotoSignup}>
                회원가입
            </button>
            <div className="memberFind">
                <Link to="/" className="colorWhite margin30">
                    이메일 찾기
                </Link>
                <Link to="/" className="colorWhite">
                    비밀번호 찾기
                </Link>
            </div>
        </form>
    );
};

export default LoginPage;
