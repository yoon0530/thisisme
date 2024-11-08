import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MyChallenges = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (!loggedInUser) {
                alert("로그인이 필요합니다.");
                return;
            }

            try {
                // 전체 도전 목록 가져오기
                const response = await axios.get('http://localhost:5000/course');
                // 신청한 도전만 필터링
                const enrolledCourses = response.data.filter(course =>
                    course.enrolledUsers && course.enrolledUsers.includes(loggedInUser.id)
                );
                setMyCourses(enrolledCourses);
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
                alert("신청한 도전을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="my-challenges">
            <h2>내가 신청한 도전</h2>
            {myCourses.length === 0 ? (
                <p>신청한 도전이 없습니다.</p>
            ) : (
                <ul>
                    {myCourses.map(course => (
                        <li key={course.id}>
                            <Link to={`/course/${course.id}`}>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyChallenges;
