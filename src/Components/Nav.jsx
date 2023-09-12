import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
  return (
    <div className='nav'>
        <div className='link'>
            <Link to='/'>Shop</Link>
        </div>
        <div className='link'>
            <Link to='/cart'>Cart</Link>
        </div>
    </div>
  )
}
