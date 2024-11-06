import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WritePost.css';

const WritePost = ({ userName }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            try {
                // 서버로 제목, 내용, 작성자 정보 전송
                await axios.post('http://localhost:5000/posts', {
                    title,
                    content,
                    author: userName || 'Anonymous',  // userName이 null일 경우 기본값 사용
                });
                navigate('/freeboard'); // 글 작성 후 자유게시판으로 이동
            } catch (error) {
                console.error("Error posting data:", error);
            }
        } else {
            alert('제목과 내용을 모두 입력해주세요.');
        }
    };

    return (
        <div className="write-post-container">
            <h2>글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">작성 완료</button>
            </form>
        </div>
    );
};

export default WritePost;
