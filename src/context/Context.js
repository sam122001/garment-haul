import React, { useState, createContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
export const ContextFunction = createContext()


const Context = ({ children }) => {
    const [cart, setCart] = useState([])
    const [wishlistData, setWishlistData] = useState([])
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    const [openAlert, setOpenAlert] = useState(false);

    const handleAddToCart = async (selectedProduct) => {
        if (setProceed) {
            try {
                const { data } = await axios.post(`http://localhost:3001/api/cart/addcart`, { _id: selectedProduct._id, quantity: selectedProduct.quantity }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setCart(data)
                setCart([...cart, selectedProduct])
                toast.success("Added To Cart", { autoClose: 500, theme: 'colored' })
            } catch (error) {
                toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
            }
        } else {
            setOpenAlert(true);
        }
    }


    return (
        <ContextFunction.Provider value={{ cart, setCart, wishlistData, setWishlistData,handleAddToCart }}>
            {children}
        </ContextFunction.Provider>
    )
}

export default Context