import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import api from '../axiosConfig'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import DOMPurify from 'dompurify'; 
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
  region: process.env.REACT_APP_REGION_NAME,
});


const Single = () => {

  const [post, setPost] = useState({});

    const location = useLocation();

    const postId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const bucketName = 'uploads-blog-website';
            try {
                const res = await api.get(`/posts/${postId}`);
                var params = {Bucket: bucketName, Key: res.data.img, Expires: 60*60};
                const signedURL = s3.getSignedUrl('getObject', params);
                const postsWithImageUrls = {...res.data, signedURL};
                setPost(postsWithImageUrls);
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

    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent
    }
    console.log(post);
  return (
    <div className='single'>
      <div className="content">
      <img src={post.signedURL} alt={post.title}/>
        <div className="user">
          {post.userImg && <img src={post.userImg} alt=""/>}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=${postId}`} state={post}>
              <img src={Edit} alt=""/>
            </Link>
            <img onClick={handleDelete} src={Delete} alt=""/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      
      </div>
      
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single