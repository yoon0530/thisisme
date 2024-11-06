import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './MyPage.css';
import axios from 'axios';

function Mypage({ parsed }) {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 예시 도전 목록 - 실제 데이터는 API로 가져올 수 있습니다)
    const challenges = [
        { id: 1, title: '도전 1' },
        { id: 2, title: '도전 2' },
        { id: 3, title: '도전 3' },
    ];

    const handleViewChallenge = (challenge) => {
        setRecentlyViewed((prev) => [...prev, challenge]);
    };

    const toggleRecentlyViewed = () => {
        setShowRecentlyViewed(!showRecentlyViewed);
    };

    const handleDeleteProfile = (e) => {
        e.preventDefault();

        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            axios
                .delete(
                    // `${process.env.REACT_APP_PROXY_URL}/members/${parsed.memberId}`,
                    // {
                    //   headers: {
                    //     Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                    //   },
                    // }
                )
                .then(() => {
                    localStorage.clear();
                    alert('그동안 이용해주셔서 감사합니다.');
                    navigate('/');
                })
                .catch((err) => alert(/*err.response.data.message*/));
        }
    };

    // 중첩 라우트 경로에 있을 때 MyPage 콘텐츠 숨기기
    const isSubRoute = location.pathname !== '/mypage';

    if (isSubRoute) {
        // 중첩 라우트가 활성화되면 `Outlet`만 렌더링
        return <Outlet />;
    }

    return (
        <div className="mypage">
            <div className="grayWrapper">
                <div className="grayLeft">
                    <p>
                        안녕하세요
                        <br />
                        오늘도 <span className="textBrown">도전 </span> 하는당신 <br />정말 멋지네요 .
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
                        <div className="grayRightTopSecond" to="#">
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
                            <button onClick={toggleRecentlyViewed}>최근 본 도전</button>
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
