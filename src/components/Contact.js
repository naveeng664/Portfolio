import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css"; // Optional: Add custom styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        formData,
        "your_user_id" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      {isSent && <p>Your message has been sent successfully!</p>}
    </div>
  );
};

export default Contact;
