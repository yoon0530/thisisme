import Button from '../components/Button';
import Container from '../components/Container';
import Lined from '../components/Lined';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <div className={styles.bg} />
            <Container className={styles.container}>
                <div className={styles.texts}>
                    <h1 className={styles.heading}>
                        <Lined>도전을 더욱 가치있게,</Lined>
                        <br />
                        <strong>도전자들</strong>
                    </h1>
                    <p className={styles.description}>
                        뿌듯함과 성취감 뿐만아니라
                        보상금까지 !!!
                    </p>
                    <div>
                        <Link to="/review">
                            <Button>도전자들 후기</Button>
                        </Link>
                    </div>
                </div>

            </Container>
        </>
    );
}

export default HomePage;
