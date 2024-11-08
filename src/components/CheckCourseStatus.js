// CheckCourseStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckCourseStatus = ({ courseId, onStatusChange }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchAndUpdateStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/course/${courseId}`);
                const { startDate, endDate } = response.data;
                const today = new Date().toISOString().split("T")[0];

                let newStatus;
                if (today < startDate) {
                    newStatus = "대기 중";
                } else if (today >= startDate && today <= endDate) {
                    newStatus = "진행중";
                } else {
                    newStatus = "종료됨";
                }

                if (response.data.status !== newStatus) {
                    await axios.patch(`http://localhost:5000/course/${courseId}`, { status: newStatus });
                }

                setStatus(newStatus);
                onStatusChange(newStatus); // 상태 변경 시 부모에 전달
            } catch (error) {
                console.error("Error fetching or updating course status:", error);
            }
        };

        fetchAndUpdateStatus();
        const intervalId = setInterval(fetchAndUpdateStatus, 1000);

        return () => clearInterval(intervalId);
    }, [courseId, onStatusChange]);

    return <span>{status}</span>;
};

export default CheckCourseStatus;
