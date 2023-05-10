import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useSelector } from 'react-redux';

interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");  
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchPosts = async () => {
    const response = await axios.get(
      `https://dev.codeleap.co.uk/careers/?limit=10&offset=${(currentPage - 1) * 10}`
    );
    setPosts(response.data.results);
    setCount(response.data.count);
  };

  useEffect(() => {
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





  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const username = useSelector((state: any) => state.user.username);
  

const handleCreatePost = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post("https://dev.codeleap.co.uk/careers/", {
      username,
      title: newTitle,
      content: newContent,
    });
    const createdPost = response.data;
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
    setNewTitle("");
    setNewContent("");
    handleCloseCreateModal();
    toast.success("Post created successfully!");
    fetchPosts();
  } catch (error) {
    console.error(error);
    toast.error("Error creating post.");
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
        toast.success("Post updated successfully!");
        fetchPosts();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the post.");
      }
    }
  };


  const handleDeletePost = async (id: number) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://dev.codeleap.co.uk/careers/${id}/`);
              setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
              toast.success('Post deleted successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              fetchPosts();
            } catch (error) {
              console.error(error);
              toast.error('An error occurred while deleting the post.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          },
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };



  return (
    <div>
      <ToastContainer />
      <button onClick={handleOpenCreateModal}>Create post</button>

      <Modal isOpen={showCreateModal} onRequestClose={handleCloseCreateModal}>
        <form onSubmit={handleCreatePost}>
          <h2>Create a new post</h2>
          <label>
            Title:
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </label>
         
          <label>
            Content:
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          </label>
          <button type="submit">Create post</button>
          <button type="button" onClick={handleCloseCreateModal}>
            Cancel
          </button>
        </form>
      </Modal>
      {editPost && (
        <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
          <h2>Edit Post</h2>
          <label>
            Title:
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </label>
          <label>
            Content:
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </label>
          <button onClick={handleEditPost}>Save</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </Modal>
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

export default Posts;