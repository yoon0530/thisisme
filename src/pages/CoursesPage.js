import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CoursesPage.css';

const CoursesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [courseList, setCourseList] = useState([]);

    // 데이터를 새로 불러오는 함수
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/course');
            setCourseList(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        // 초기 로드 또는 새로고침 시 전체 데이터를 가져옴
        fetchCourses();
    }, []);

    useEffect(() => {
        // 새로운 도전이 추가되었을 때만 업데이트
        if (location.state?.newCourse && !courseList.some(course => course.id === location.state.newCourse.id)) {
            setCourseList(prevCourses => [location.state.newCourse, ...prevCourses]);
        }

        // 삭제된 도전이 있을 때만 업데이트
        if (location.state?.deletedCourseId) {
            setCourseList(prevCourses =>
                prevCourses.filter(course => course.id !== location.state.deletedCourseId)
            );
        }
    }, [location.state]);

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleCreateChallenge = () => {
        navigate('/create-course');
    };

    return (
        <div className="courses-page">
            <h1>도전 목록</h1>
            <div className="courses-grid">
                {courseList.map(course => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => handleCardClick(course.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="course-header">
                            <span>{course.type}</span>
                            <span className="course-progress">{course.progress}</span>
                        </div>
                        <div className="course-dates">
                            {course.startDate || "N/A"} - {course.endDate || "N/A"}
                        </div>
                        <h3 className="course-title">{course.title}</h3>
                        <p className="course-professor">{course.professor} / {course.location}</p>
                        <p className="course-category">일반강의</p>
                    </div>
                ))}
            </div>
            <button className="create-challenge-button" onClick={handleCreateChallenge}>
                도전 생성
            </button>
        </div>
    );
};

export default CoursesPage;
