import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useSelector } from 'react-redux';
import { PostsDiv } from "./style";
import { Trash, NotePencil } from "@phosphor-icons/react";
import { Header } from "../../components/header";


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
  
  const isButtonDisabled = newTitle.length < 10 || newContent.length < 20;


  const PAGE_KEY = "current_page";

const fetchPosts = async (page: number) => {
  console.log("Fetching page:", page);
  const response = await axios.get(`https://dev.codeleap.co.uk/careers/?limit=10&offset=${(page - 1) * 10}`);
  return response.data;
};

const savePageToStorage = (page: number) => {
  sessionStorage.setItem(PAGE_KEY, page.toString());
};

const loadPageFromStorage = async () => {
  const currentPageFromStorage = sessionStorage.getItem(PAGE_KEY);
  return parseInt(currentPageFromStorage) || 1;
};

const loadPosts = async (page: number) => {
  const data = await fetchPosts(page);
  setPosts(data.results);
  setCount(data.count);
  savePageToStorage(page);
};

useEffect(() => {
  loadPageFromStorage().then(setCurrentPage);
}, []);

useEffect(() => {
  loadPosts(currentPage);
}, [currentPage]);

useEffect(() => {
  const storedPage = sessionStorage.getItem(PAGE_KEY);
  const pageToLoad = parseInt(storedPage) || 1;
  loadPosts(pageToLoad).catch(console.error);
}, []);




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


  function formatDateTime(datetimeStr: any) {
    const datetime = new Date(datetimeStr);
    const now = new Date();
    const diffInSeconds = (now.getTime() - datetime.getTime()) / 1000;

    if (diffInSeconds < 60) {
      return Math.floor(diffInSeconds) + " seconds ago";
    } else if (diffInSeconds < 3600) {
      return Math.floor(diffInSeconds / 60) + " minutes ago";
    } else if (diffInSeconds < 86400) {
      return Math.floor(diffInSeconds / 3600) + " hours ago";
    } else if (diffInSeconds < 2592000) {
      return Math.floor(diffInSeconds / 86400) + " days ago";
    } else {
      return datetime.toLocaleDateString();
    }
  }






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
      const updatedPosts = await fetchPosts(currentPage);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setNewTitle("");
      setNewContent("");
      handleCloseCreateModal();
      toast.success("Post created successfully!");   
  
      // Fetch the current page to update the posts
      const data = await fetchPosts(currentPage);
      setPosts(data.results);
    } catch (error) {
      console.error(error);
      toast.error("Error creating post.");
    }
  };


  
  
  
  



  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '240px',
      height: '60vh',
      background: 'linear-gradient(45deg, #8481FA, #38C9C8)',
    },

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
    event?.preventDefault();
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
              const data = await fetchPosts(currentPage);
              setPosts(data.results);
              
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
    <PostsDiv>
      <ToastContainer />
      <Header />
      <div className="newPost">
      <h2>New ideias?</h2><button onClick={handleOpenCreateModal} >Create post</button>
      </div>

      <Modal isOpen={showCreateModal} onRequestClose={handleCloseCreateModal} style={customStyles} >
        <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Helvetica', margin: '0 20px', alignItems: 'center' }} >
          <h2 style={{ color: 'white', fontWeight: '700', textAlign: 'center' }} >What's on you mind?</h2>
          <label style={{ color: 'white', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
            Title:
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </label>

          <label style={{ color: 'white', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
            Content:
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} style={{ height: '70px' }} />
          </label>
          <div style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Helvetica', margin: '20px', alignItems: 'center' }}>
            <button type="submit" disabled={isButtonDisabled} style={{ fontFamily: 'Helvetica', marginRight: '10px', background: '#040404', color: 'white', border: 'none', padding: '5px 5px', opacity: isButtonDisabled ? 0.5 : 1 }} >Create post</button>
            <button type="button" onClick={handleCloseCreateModal} style={{ fontFamily: 'Helvetica', marginRight: '10px', background: '#040404', color: 'white', border: 'none', padding: '5px 5px' }} >

              Cancel
            </button>
          </div>
        </form>
      </Modal>
      {editPost && (
        <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customStyles}>
          <form style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Helvetica', margin: '0 20px', alignItems: 'center' }} onSubmit={handleEditPost}>
            <h2 style={{ color: 'white', fontWeight: '700', textAlign: 'center' }} >Edit Post</h2>
            <label style={{ color: 'white', fontWeight: '700', textAlign: 'center', marginTop: '10px' }} >
              Title:
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </label>
            <label style={{ color: 'white', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
              Content:
              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} style={{ height: '70px' }} />
            </label>
            <div>
              <button type="submit" style={{ fontFamily: 'Helvetica', marginRight: '10px', background: '#040404', color: 'white', border: 'none', padding: '5px 10px', marginTop: '20px' }} >Save</button>
              <button onClick={handleCloseModal} style={{ fontFamily: 'Helvetica', marginRight: '10px', background: '#040404', color: 'white', border: 'none', padding: '5px 10px' }} >Cancel</button>
            </div>
          </form>
        </Modal>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <span>{post.title}</span>
              {username === "admin" && (
                <div className="actions">
                  <button onClick={() => handleDeletePost(post.id)}><Trash size={16} color="#cdcdcd" /></button>
                  <button onClick={() => handleOpenModal(post)}><NotePencil size={16} color="#cdcdcd" /></button>

                </div>
              )}</div>

            <div>
              <p>@{post.username} </p>
              <p>{formatDateTime(post.created_datetime)}</p>
            </div>

            <p>{post.content}</p>


          </li>
        ))}
      </ul>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
        {getPageNumbers().map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}  disabled={currentPage === number} >
            {number}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
      </div>
    </PostsDiv>
  );

};

export default Posts;