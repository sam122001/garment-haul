import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import '../styles/singleCategory.css';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { ContextFunction } from '../context/Context';
import { toast } from 'react-toastify';

function SingleCategory() {
  const { product } = useContext(ProductContext);
  const { handleAddToCart } = useContext(ContextFunction);
  const { cat } = useParams();
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending

  // Filter products based on category
  const filteredProducts = product.filter(item => item.category === cat);

  // Sort filtered products based on price and selected sort order
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);
    if (sortOrder === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  return (
    <div className="menu" style={{ marginTop: "auto" }}>
      <div className="menuTitle">Our Collections</div>
      <div className="priceSort">
        <label>
          Sort by Price:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </label>
      </div>
      <div className="menuList">
        {sortedProducts.map((data) => (
          <div key={data._id} className="menuItem">
            <Link to={`/productcat/${data._id}`} style={{ textDecoration: 'none' }}>
              <div className="imageContainer" style={{ backgroundImage: `url(${data.image})` }}></div>
              </Link>
              <h1 style={{marginTop: '10%'}}>{data.name}</h1>
              <div className="ratingContainer" style={{ textAlign: 'center' }}>
                <Rating name="half-rating-read" defaultValue={Math.round(data.rating)} precision={0.5} readOnly style={{ verticalAlign: 'middle'}} />
                <span className="ratingText" style={{ verticalAlign: 'middle', marginLeft: '5px' }}>{data.rating}</span>
                <p>₹{data.price}</p>
                <div className="buttonContainer">
              <button className="cart" onClick={() => handleAddToCart({ ...data, quantity: 1 })}>Add to Cart</button>
              </div>
            
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCategory;
