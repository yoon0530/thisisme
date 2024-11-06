import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = ({ userName }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}`);
                alert("글이 삭제되었습니다.");
                navigate('/freeboard'); // 삭제 후 게시글 목록 페이지로 이동
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("글 삭제에 실패했습니다.");
            }
        }
    };

    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-detail-container">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>

            {/* 수정 및 삭제 버튼: 로그인한 사용자와 작성자가 같을 경우에만 표시 */}
            {userName === post.author && (
                <div className="button-group">
                    <button onClick={handleEdit} className="edit-button">수정</button>
                    <button onClick={handleDelete} className="delete-button">삭제</button>
                </div>
            )}

            {/* 뒤로 가기 버튼 */}
            <button onClick={handleBack} className="back-button">뒤로 가기</button>
        </div>
    );
};

export default PostDetail;
