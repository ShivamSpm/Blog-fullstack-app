import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Single = () => {
  return (
    <div className='single'>
      <div class="content">
        <img src="https://picsum.photos/200/300" alt=""/>
        <div class="user">
          <img src="https://picsum.photos/200/300" alt=""/>
          <div class="info">
            <span>Shivam</span>
            <p>Posted 2 days ago</p>
          </div>
          <div class="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt=""/>
            </Link>
            <img src={Delete} alt=""/>
          </div>
        </div>
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel et ratione beatae! Cum animi qui architecto sint placeat molestias ex, omnis id porro possimus deserunt adipisci perspiciatis odio voluptas. Aliquid?</p>
      
      </div>
      
      <Menu/>
    </div>
  )
}

export default Single