import React, { useState } from 'react';
import axios from 'axios';

const PointExchange = () => {
    const [bank, setBank] = useState('');
    const [points, setPoints] = useState('');
    const [message, setMessage] = useState('');

    const handlePointsChange = (e) => {
        const value = e.target.value;
        // 숫자만 허용
        if (/^\d*$/.test(value)) {
            setPoints(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 포인트 환전 로직
        const data = {
            bank,
            points: parseInt(points, 10), // 문자열을 정수로 변환
            date: new Date().toISOString() // 환전 날짜 추가
        };

        try {
            const response = await axios.post('http://localhost:5000/exchanges', data); // JSON Server API 주소
            console.log('응답:', response.data);
            setMessage('포인트 환전이 성공적으로 완료되었습니다.');

            // 성공적으로 전송된 후 입력값 초기화
            setBank('');
            setPoints('');
        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
            setMessage('환전 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>포인트 환전</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        나의 계좌:
                        <select value={bank} onChange={(e) => setBank(e.target.value)} style={{ marginLeft: '10px' }}>
                            <option value="">은행 선택</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                            <option value="토스">토스</option>
                            <option value="기타">등등</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        금액:
                        <input
                            type="text"
                            value={points}
                            onChange={handlePointsChange}
                            placeholder="환전할 포인트 입력"
                            required
                            style={{ marginLeft: '10px', width: '100px' }}
                        />
                    </label>
                </div>
                <p>* 예금주가 동일해야 합니다.</p>
                <button type="submit">신청</button>
            </form>
        </div>
    );
};

export default PointExchange;
