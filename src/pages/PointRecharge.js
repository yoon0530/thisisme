import React, { useState } from 'react';
import axios from 'axios';

const PointRecharge = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 포인트 충전 로직
        const data = {
            accountNumber,
            amount: parseInt(amount, 10), // 문자열을 정수로 변환
            date: new Date().toISOString() // 충전 날짜 추가
        };

        try {
            const response = await axios.post('http://localhost:5000/recharges', data); // JSON Server API 주소
            console.log('응답:', response.data);
            setMessage('포인트 충전이 성공적으로 완료되었습니다.');

            // 성공적으로 전송된 후 입력값 초기화
            setAccountNumber('');
            setAmount('');
        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
            setMessage('충전 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // 숫자만 허용
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>포인트 충전</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        입금계좌 선택:
                        <select value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={{ marginLeft: '10px' }}>
                            <option value="">계좌 선택</option>
                            <option value="kakao">카카오뱅크</option>
                            <option value="kookmin">국민은행</option>
                            <option value="other">기타</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        입금액:
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="입금액 입력"
                            required
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <button type="submit">신청</button>
            </form>
        </div>
    );
};

export default PointRecharge;
