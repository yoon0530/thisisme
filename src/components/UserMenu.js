import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import personIcon from '../assets/person.png';
import styles from './UserMenu.module.css';

function UserMenu({ isLoggedIn, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = useCallback((e) => {
        e.stopPropagation();
        setIsOpen((nextIsOpen) => !nextIsOpen);
    }, []);

    const handleLogout = () => {
        onLogout(); // 상위 컴포넌트에서 받은 로그아웃 핸들러 호출
        setIsOpen(false); // 메뉴 닫기
        navigate('/'); // 로그아웃 후 메인 페이지로 이동
    };

    const handleMenuItemClick = () => {
        setIsOpen(false); // 메뉴 닫기
    };

    return (
        <div className={styles.userMenu}>
            <button className={styles.iconButton} onClick={handleButtonClick}>
                <img src={personIcon} alt="유저 메뉴" />
            </button>
            {isOpen && (
                <ul className={styles.popup}>
                    {/* 로그인 상태에 따라 조건부 렌더링 */}
                    {!isLoggedIn ? (
                        <>
                            <Link to="/signup" onClick={handleMenuItemClick}>
                                <li>회원가입</li>
                            </Link>
                            <Link to="/login" onClick={handleMenuItemClick}>
                                <li>로그인</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/my-challenge" onClick={handleMenuItemClick}>
                                <li>나의 도전</li>
                            </Link>
                            <Link to="/mypage" onClick={handleMenuItemClick}>
                                <li>마이페이지</li>
                            </Link>
                            <li onClick={handleLogout}>로그아웃</li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}

export default UserMenu;
