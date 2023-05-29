import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../axiosConfig';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/posts${cat}`);
                setPosts(res.data);
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
    <div className='home'>
        <div className='posts'>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                    <div className='img'>
                        <img src={post.img} alt=""/>
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{post.desc}</p>
                        <button>Read More</button>
                    </div>
                </div>
            ))};
        </div>

    </div>
  )
}

export default Home