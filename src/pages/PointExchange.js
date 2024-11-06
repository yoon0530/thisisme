import React, { useState } from 'react';
import axios from 'axios';
import './PointExchange.css'; // CSS 파일을 임포트합니다.

const PointExchange = () => {
    const [bank, setBank] = useState('');
    const [points, setPoints] = useState('');
    const [message, setMessage] = useState('');

    const handlePointsChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPoints(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인한 사용자 정보에서 ID를 가져옵니다.
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id; // user 객체가 존재할 경우 id를 가져옵니다.

        const data = {
            bank,
            points: parseInt(points, 10),
            date: new Date().toISOString(),
            userId  // 로그인한 사용자 ID를 포함합니다.
        };

        try {
            const response = await axios.post('http://localhost:5000/exchanges', data);
            console.log('응답:', response.data);
            setMessage('포인트 환전이 성공적으로 완료되었습니다.');

            setBank('');
            setPoints('');
        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
            setMessage('환전 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="container">
            <h2 className="heading">포인트 환전</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">
                        나의 계좌:
                        <select
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            className="select"
                        >
                            <option value="">은행 선택</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                            <option value="토스">토스</option>
                            <option value="기타">기타</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="label">
                        금액:
                        <input
                            type="text"
                            value={points}
                            onChange={handlePointsChange}
                            placeholder="환전할 포인트 입력"
                            required
                            className="input"
                        />
                    </label>
                </div>
                <p className="note">* 예금주가 동일해야 합니다.</p>
                <button type="submit" className="button">신청</button>
            </form>
        </div>
    );
};

export default PointExchange;
