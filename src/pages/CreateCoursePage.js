import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateCoursePage.css';

const CreateCoursePage = () => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        type: '',
        progress: '',
        professor: '',
        location: '',
        startDate: '',
        endDate: '',
        category: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 중복 제출 방지
        if (isSubmitting) return;

        setIsSubmitting(true); // 제출 상태 설정

        // 사용자 정보 가져오기
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // 새로운 도전 데이터 생성, 사용자 정보 포함
        const newCourse = {
            id: Date.now().toString(),
            ...courseData,
            authorId: loggedInUser?.id,
            authorName: loggedInUser?.name
        };

        try {
            const response = await axios.post('http://localhost:5000/course', newCourse);
            alert('도전이 성공적으로 추가되었습니다!');
            navigate('/course', { state: { newCourse: response.data } });
        } catch (error) {
            console.error('도전 생성 중 오류 발생:', error);
            alert('도전 생성에 실패했습니다.');
        } finally {
            setIsSubmitting(false); // 제출 완료 후 상태 초기화
        }
    };

    return (
        <div className="create-course-page">
            <h2>도전 생성</h2>
            <form onSubmit={handleSubmit} className="create-course-form">
                <label>
                    제목:
                    <input type="text" name="title" value={courseData.title} onChange={handleChange} required />
                </label>
                <label>
                    유형:
                    <input type="text" name="type" value={courseData.type} onChange={handleChange} required />
                </label>
                <label>
                    진행률:
                    <input type="text" name="progress" value={courseData.progress} onChange={handleChange} required />
                </label>
                <label>
                    교수:
                    <input type="text" name="professor" value={courseData.professor} onChange={handleChange} required />
                </label>
                <label>
                    위치:
                    <input type="text" name="location" value={courseData.location} onChange={handleChange} required />
                </label>
                <label>
                    시작 날짜:
                    <input type="date" name="startDate" value={courseData.startDate} onChange={handleChange} required />
                </label>
                <label>
                    종료 날짜:
                    <input type="date" name="endDate" value={courseData.endDate} onChange={handleChange} required />
                </label>
                <label>
                    카테고리:
                    <input type="text" name="category" value={courseData.category} onChange={handleChange} required />
                </label>
                <label>
                    설명:
                    <textarea name="description" value={courseData.description} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={isSubmitting}>도전 생성</button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
