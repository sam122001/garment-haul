import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductContext from './ProductContext';

function ProductContextProvider({children}) {
    const [product, setProduct] = useState([]);

    

    useEffect(() => {
        axios.get('http://localhost:3001/api/product/getAllProducts').then((res) => {
            setProduct(res.data);
        });
      }, []);

  return (
    <>
    <ProductContext.Provider value={{product}}>
    {children}
    </ProductContext.Provider>
    </>
  )
}

export default ProductContextProvider