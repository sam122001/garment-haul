import React,{ useState} from 'react'
import axios from 'axios';
import '../styles/addProducts.css'
import pizzaleft from "../assets/aboutne.jpg";
import { toast } from 'react-toastify';

function AddProducts() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: '',
    type: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/admin/addProduct", formData);
      // Optionally, reset the form after successful submission
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: '',
        type: '',
        quantity: ''
      });
      toast.success('successfully Added!', { autoClose: 2000 });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  return (
    <div className="contact">
      <div className="rightSide">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
      </div>
      <div className="leftSide" style={{ backgroundImage: `url(${pizzaleft})` }}></div>
    </div>
  );
  
}

export default AddProducts