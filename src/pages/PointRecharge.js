import React, { useState } from 'react';
import axios from 'axios';
import './PointRecharge.css'; // CSS 파일을 임포트합니다.

const PointRecharge = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인한 사용자 정보를 localStorage에서 가져옵니다.
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id; // user 객체가 존재할 경우 id를 가져옵니다.

        const data = {
            accountNumber,
            amount: parseInt(amount, 10),
            date: new Date().toISOString(),
            userId  // 로그인한 사용자 ID를 포함합니다.
        };

        try {
            const response = await axios.post('http://localhost:5000/recharges', data);
            console.log('응답:', response.data);
            setMessage('포인트 충전이 성공적으로 완료되었습니다.');

            setAccountNumber('');
            setAmount('');
        } catch (error) {
            console.error('데이터 전송 중 오류 발생:', error);
            setMessage('충전 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <div className="container">
            <h2 className="heading">포인트 충전</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">
                        입금계좌 선택:
                        <select
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="select"
                        >
                            <option value="">계좌 선택</option>
                            <option value="kakao">카카오뱅크</option>
                            <option value="kookmin">국민은행</option>
                            <option value="other">기타</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="label">
                        입금액:
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="입금액 입력"
                            required
                            className="input"
                        />
                    </label>
                </div>
                <button type="submit" className="button">신청</button>
            </form>
        </div>
    );
};

export default PointRecharge;
