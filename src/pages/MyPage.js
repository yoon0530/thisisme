import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './MyPage.css';
import axios from 'axios';

function Mypage({ parsed, onLogout }) {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDeleteProfile = async (e) => {
        e.preventDefault();

        if (!parsed || !parsed.id) {
            alert("유효한 사용자 정보가 없습니다.");
            return;
        }

        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            try {
                console.log("Deleting user with ID:", parsed.id);
                const response = await axios.delete(`http://localhost:5000/users/${parsed.id}`);

                if (response.status === 200 || response.status === 204) {
                    onLogout(false); // handleLogout 호출 시 alert 표시 안 함
                    alert('그동안 이용해주셔서 감사합니다.');
                    navigate('/');
                } else {
                    console.error("회원탈퇴 실패:", response.status);
                    alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (err) {
                console.error("회원탈퇴 중 오류 발생:", err);
                alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 중첩 라우트 경로에 있을 때 MyPage 콘텐츠 숨기기
    const isSubRoute = location.pathname !== '/mypage';

    if (isSubRoute) {
        return <Outlet />;
    }

    return (
        <div className="mypage">
            <div className="grayWrapper">
                <div className="grayLeft">
                    <p>
                        안녕하세요
                        <br />
                        오늘도 <span className="textBrown">도전 </span> 하는 당신 <br />정말 멋지네요.
                    </p>
                    <button className="buttonStyle">SIMPLE 회원</button>
                </div>
                <div className="grayRight">
                    <div className="grayRightTop">
                        <div className="grayRightTopFirst">
                            <span>포인트 적립 </span>
                            <Link className="linkStyle" to="#">
                                0원
                            </Link>
                        </div>
                        <div className="grayRightTopSecond">
                            <span>포인트 충전 / 환전</span>
                            <button onClick={() => navigate('/mypage/pointrecharge')}>충전하기</button>
                            <button onClick={() => navigate('/mypage/pointexchange')}>환전하기</button>
                        </div>
                    </div>
                    <div className="grayRightThird">
                        <p>성공한 도전 내역</p>
                        <Link className="linkStyle" to="#">
                            0개
                        </Link>
                    </div>
                </div>
            </div>
            <div className="whiteWrapper">
                <div className="whiteInner">
                    <div className="whiteLeft">
                        <p className="title">마이페이지</p>
                        <div className="boxList">
                            <button>정보수정</button>
                            <button>최근 본 도전</button>
                            <button onClick={() => navigate('/mypage/pointhistory')}>포인트 내역 확인</button>
                            <button>고객센터</button>
                            <button onClick={handleDeleteProfile}>회원탈퇴</button>
                        </div>
                    </div>
                    <div className="whiteRight">
                        <div className="orderStatus">
                            <p>
                                도전 현황<span>(현재 진행 중인 도전)</span>
                            </p>
                            <button>지난 도전</button>
                        </div>
                        <div className="blankPage" />
                    </div>
                </div>
            </div>

            {/* 최근 본 도전 목록 표시 */}
            {showRecentlyViewed && (
                <div className="recentlyViewed">
                    <h3> 최근 본 도전 목록 </h3>
                    {recentlyViewed.length > 0 ? (
                        recentlyViewed.map((challenge) => (
                            <div key={challenge.id}>
                                <p>{challenge.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>최근 본 도전이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Mypage;
