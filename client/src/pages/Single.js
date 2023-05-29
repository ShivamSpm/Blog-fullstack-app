import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import api from '../axiosConfig'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {

  const [post, setPost] = useState({});

    const location = useLocation();

    const postId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [postId]);
  
    const handleDelete = async () => {
      try {
        await api.delete(`/posts/${postId}`, {
          withCredentials: true
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    
  return (
    <div className='single'>
      <div className="content">
        <img src={post?.img} alt=""/>
        <div className="user">
          {post.userImg && <img src={post.userImg} alt=""/>}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt=""/>
            </Link>
            <img onClick={handleDelete} src={Delete} alt=""/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      
      </div>
      
      <Menu/>
    </div>
  )
}

export default Single