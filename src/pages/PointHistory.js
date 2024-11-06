import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PointHistory = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/points'); // 포트를 5000으로 설정
                setPoints(response.data);
            } catch (error) {
                console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>포인트 내역 확인</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>분류</th>
                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>일시</th>
                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>금액</th>
                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>잔액</th>
                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>상태</th>
                </tr>
                </thead>
                <tbody>
                {points.map((point) => (
                    <tr key={point.id}>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{point.category}</td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                            {new Date(point.date).toLocaleString()}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                            {point.amount.toLocaleString()} 원
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                            {point.balance.toLocaleString()} 원
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{point.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointHistory;
