import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompletedChallenges = () => {
    const [completedChallenges, setCompletedChallenges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompletedChallenges = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem('user'));
                if (!loggedInUser) {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/course');

                // status가 "종료됨"이고 사용자가 신청했던 도전들만 필터링
                const completed = response.data.filter(
                    challenge =>
                        challenge.status === "종료됨" &&
                        challenge.enrolledUsers?.includes(loggedInUser.id)
                );

                setCompletedChallenges(completed);
            } catch (error) {
                console.error("Error fetching completed challenges:", error);
            }
        };

        fetchCompletedChallenges();
    }, [navigate]);

    return (
        <div className="completed-challenges">
            <h2>종료된 도전 내역</h2>
            {completedChallenges.length > 0 ? (
                completedChallenges.map(challenge => (
                    <div key={challenge.id} className="challengeItem">
                        <h3>{challenge.title}</h3>
                        <p><strong>유형:</strong> {challenge.type}</p>
                        <p><strong>교수:</strong> {challenge.professor}</p>
                        <p><strong>기간:</strong> {challenge.startDate} - {challenge.endDate}</p>
                    </div>
                ))
            ) : (
                <p className="no-completed-challenges">종료된 도전이 없습니다.</p>
            )}
        </div>
    );
};

export default CompletedChallenges;
