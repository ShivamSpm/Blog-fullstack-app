import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../axiosConfig';
import AWS from 'aws-sdk';

// const s3 = new S3();
const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
    region: process.env.REACT_APP_REGION_NAME,
});

const Home = () => {
    const [posts, setPosts] = useState([]);

    const category = useLocation().search;

    useEffect(() => {
        const bucketName = 'uploads-blog-website';
        const fetchData = async () => {
            try {

                const res = await api.get(`/posts${category}`);

                const postsWithImageUrls = res.data.map(post => {
                    var params = {Bucket: bucketName, Key: post.img, Expires: 60*60};
                    const signedURL = s3.getSignedUrl('getObject', params);
                    return {...post, signedURL};
                  });
                  setPosts(postsWithImageUrls);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [category])
    
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent
    }

    // console.log(posts);

  return (
    <div className='home'>
        <div className='posts'>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                    <div className='img'>
                        <img src={post.signedURL} alt={post.title}/>
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.desc)}</p>
                        <button>Read More</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home