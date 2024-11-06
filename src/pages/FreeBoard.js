import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FreeBoard.css';
import axios from 'axios';

const FreeBoard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="board-container">
            <h1>자유게시판</h1>
            <div className="post-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div
                            key={post.id}
                            className="post"
                            onClick={() => navigate(`/post/${post.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {post.title}
                        </div>
                    ))
                ) : (
                    <p className="no-posts-message">현재 게시된 글이 없습니다.</p>
                )}
            </div>
            <div className="pagination">
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(num => (
                    <button key={num} onClick={() => paginate(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>
                        {num + 1}
                    </button>
                ))}
            </div>
            <button className="write-button" onClick={() => navigate('/write')}>글 작성</button>
        </div>
    );
};

export default FreeBoard;
