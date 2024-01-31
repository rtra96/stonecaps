import React, { useState } from "react";
import "../App.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Account Created!", responseData);
        alert("Account Created Successfully");
      } else {
        const msg = await response.json();
        console.error("Registration failed:", response.statusText);
        setErrorMessage(msg.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrorMessage("Registration failed. Please try again.");
      alert("Account creation failed. Please check your provided info.");
    }
  };

  return (
    <div className="flavor-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="formz">
        <label>
          {" "}
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          {" "}
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          {" "}
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          {" "}
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className="punch-button">
          Register
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
