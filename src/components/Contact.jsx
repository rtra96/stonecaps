import React, { useState } from "react";
import Github from "../images/github.svg";
import Facebook from "../images/facebook.svg";
import Linkedin from "../images/linkedin.svg";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending data to a server)
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      inquiry: "",
    });
  };

  return (
    <div>
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="please provide a valid email adress"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          <textarea
            name="inquiry"
            placeholder="How can we help?"
            value={formData.inquiry}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button className="punch-button" type="submit">Submit</button>
      </form>
    </div>
    <footer>
        <div className="social-icons">
          {/* GitHub Icon */}
          <a href="https://github.com/rtra96" target="_blank" rel="noopener noreferrer">
            <img src={Github} alt="GitHub" width="32" height="32" />
          </a>

          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/rick-trahant/" target="_blank" rel="noopener noreferrer">
            <img src={Linkedin} alt="LinkedIn" width="32" height="32" />
          </a>

          {/* Facebook Icon */}
          <a href="https://www.facebook.com/profile.php?id=100003172443953" target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="Facebook" width="32" height="32" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
