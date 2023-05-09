import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

const Login = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `https://dev.codeleap.co.uk/careers/?limit=10&offset=${(currentPage - 1) * 10}`
      );
      setPosts(response.data.results);
      setCount(response.data.count);
    };
    fetchPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(count / 10);

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage <= 3) {
      endPage = Math.min(7, totalPages);
    } else if (currentPage >= totalPages - 3) {
      startPage = Math.max(totalPages - 6, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dev.codeleap.co.uk/careers/', {
        username: newUsername,
        title: newTitle,
        content: newContent,
      });
      const createdPost = response.data;
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      setNewUsername("");
      setNewTitle("");
      setNewContent("");
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = async () => {
    if (editPost) {
      const { id } = editPost;
      try {
        const response = await axios.patch(
          `https://dev.codeleap.co.uk/careers/${id}/`,
          {
            title: editTitle,
            content: editContent,
          }
        );
        const updatedPost = response.data;
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
        handleCloseModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

    const handleDeletePost = async (id: number) => {
    try {
      await axios.delete(`https://dev.codeleap.co.uk/careers/${id}/`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (post: Post) => {
    setEditPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditPost(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div>
      <form onSubmit={handleCreatePost}>
        <h2>Create a new post</h2>
        <label>
          Title:
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </label>
        <label>
          username:
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        </label>
        <button type="submit">Create post</button>
      </form>
      {showModal && (
        <div>
          <h2>Edit post</h2>
          <label>
            Title:
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </label>
          <label>
            Content:
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </label>
          <button onClick={handleEditPost}>Save changes</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              By {post.username} on {post.created_datetime}
            </p>
            <button onClick={() => handleOpenModal(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {getPageNumbers().map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
  
    };
    
    export default Login;