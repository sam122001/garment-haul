import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/adminCustomer.css'

function AdminCustomer() {
  const [customerData, setCustomerData] = useState([]);
  console.log(customerData, "cust data");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/customer/getcontact');
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:3001/api/customer/delete/${customerId}`);
      
      // Remove the deleted customer from the local state
      setCustomerData(prevCustomerData => prevCustomerData.filter(customer => customer._id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  

  return (
    <div className="container">
    <div className="table-container">
      <h2 style={{textAlign: 'center'}}>Customer reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th> {/* Add Action column for delete button */}
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.message}</td>
              <td>
                <button onClick={() => handleDelete(customer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminCustomer;
