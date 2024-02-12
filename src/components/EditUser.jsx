import React, { useState } from "react";
  

const ShippingProfileComponent = () => {
  const [editing, setEditing] = useState(false);
  const [shippingProfiles, setShippingProfiles] = useState([
    // Sample data fetched from the API
    { id: 1, city: "Sample City", state: "CA", address: "123 Main St", zipCode: "12345" },
  ]);

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddShippingProfile = () => {
    // Validate the form fields before adding a new profile
    if (formData.city && formData.state && formData.address && formData.zipCode) {
      setShippingProfiles((prevProfiles) => [
        ...prevProfiles,
        { ...formData, id: Date.now() },
      ]);
      setFormData({
        city: "",
        state: "",
        address: "",
        zipCode: "",
      });
      setEditing(false);
    } else {
      // Handle validation error (show a message, etc.)
    }
  };

  const handleEditShippingProfile = (id) => {
    // Implement the logic to edit the shipping profile
    console.log("Edit shipping profile with ID:", id);
  };

  const handleDeleteShippingProfile = (id) => {
    // Implement the logic to delete the shipping profile
    console.log("Delete shipping profile with ID:", id);
  };

  return (
    <div>
      {shippingProfiles.map((profile) => (
        <div key={profile.id} className="shipping-profile-card">
          <p>{`${profile.city}, ${profile.state}, ${profile.address}, ${profile.zipCode}`}</p>
          <div>
            <button onClick={() => handleEditShippingProfile(profile.id)}>Edit</button>
            <button onClick={() => handleDeleteShippingProfile(profile.id)}>Delete</button>
          </div>
        </div>
      ))}

      {editing ? (
        <div className="shipping-profile-form">
          <label>City: </label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <label>State: </label>
          <input type="text" name="state" value={formData.state} onChange={handleInputChange} />

          <label>Address: </label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

          <label>Zip Code: </label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />

          <button onClick={handleAddShippingProfile}>Add</button>
        </div>
      ) : (
        <div className="add-profile-card" onClick={() => setEditing(true)}>
          Add new shipping profile
        </div>
      )}
    </div>
  );
};

export default ShippingProfileComponent;
