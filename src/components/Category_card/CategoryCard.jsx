import React from 'react'
import './CategoryCard.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({ data }) => {
    return (
        <Link to={`product/${data.name.toLowerCase()}`}>
            <div className='mainCard'>
                <img src={data.img} alt="" className='mainImg' loading='lazy' />
                <span className='imgTitle'>{data.name}</span>
            </div>
        </Link>
    )
}

export default CategoryCard