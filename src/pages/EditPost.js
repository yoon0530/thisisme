import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(''); // 작성자 정보 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setAuthor(response.data.author); // 작성자 정보 설정
            } catch (error) {
                console.error("Error fetching post for editing:", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/posts/${id}`, {
                title,
                content,
                author, // 작성자 정보 포함하여 전송
            });
            navigate(`/post/${id}`, { replace: true });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="edit-post-container">
            <h2>글 수정</h2>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
};

export default EditPost;
