import React, { useState } from "react";
import pizzaleft from "../assets/aboutne.jpg";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to store data in the backend
    try {
      const response = await fetch("http://localhost:3001/api/customer/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization")
        },
        body: JSON.stringify({ ...formData, userId: localStorage.getItem("userId") })
      });

      if (response.ok) {
        // Data submitted successfully
        console.log("Data submitted successfully");
        // You can add further actions like showing a success message, resetting the form, etc.
      } else {
        // Handle error response
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="contact">
      <div className="leftSide" style={{ backgroundImage: `url(${pizzaleft})` }}></div>
      <div className="rightSide">
        <h1>Contact us</h1>
        <form id="contact-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            name="name"
            placeholder="Enter full name..."
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            placeholder="Enter email..."
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Message</label>
          <textarea
            rows="6"
            placeholder="Send us your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
