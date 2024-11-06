import logo from '../assets/grayLogo.svg';
import facebookIcon from '../assets/facebook.svg';
import twitterIcon from '../assets/twitter.svg';
import instagramIcon from '../assets/instagram.svg';
import styles from './Footer.module.css';
import Container from './Container';

function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <ul className={styles.links}>
                    <li>도전자들 소개</li>
                    <li>개인정보 취급방침</li>
                    <li>사용자 이용약관</li>
                    <li>자주 묻는 질문</li>
                </ul>
                <ul className={styles.info}>
                    <li>(주)도전자들</li>
                    <li>주최자들 | 이윤철 이선재 강지은 정은아 </li>
                    <li>개인정보보호책임자 | 이선재 정은아 </li>
                    <li>대표 번호 | 063-****-**** </li>
                    <li>주소 | 전북특별자치도 익산시 익산대로  </li>
                </ul>
                <div className={styles.icons}>
                    <img src={logo} alt="codethat" />
                    <div className={styles.sns}>
                        <img src={facebookIcon} alt="facebook icon" />
                        <img src={twitterIcon} alt="twitter icon" />
                        <img src={instagramIcon} alt="instagram icon" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
