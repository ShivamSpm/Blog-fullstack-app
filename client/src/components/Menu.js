import React, { useEffect, useState } from 'react'
import api from '../axiosConfig'
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
    region: process.env.REACT_APP_REGION_NAME,
});

const Menu = ({cat}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const bucketName = 'uploads-blog-website';
            try {
                const res = await api.get(`/posts/?cat=${cat}`);

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
    }, [cat])
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum",
    //         desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         img:"https://picsum.photos/200/300",
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum",
    //         desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         img:"https://picsum.photos/200/300",
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum",
    //         desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         img:"https://picsum.photos/200/300",
    //     },

    //     {
    //         id: 4,
    //         title: "Lorem ipsum",
    //         desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         img:"https://picsum.photos/200/300",
    //     }
    // ]

    
    
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={post.signedURL} alt={post.title}/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu