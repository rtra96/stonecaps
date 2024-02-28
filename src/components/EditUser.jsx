//experimental code
import React, { useState, useEffect } from "react";

const ShippingProfileComponent = () => {
  const [editing, setEditing] = useState(false);
  const [shippingProfiles, setShippingProfiles] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    zipCode: "",
  });

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace the URL with the actual endpoint for fetching user data
        const response = await fetch("https://fakestoreapi.com/users");
        const userData = await response.json();

        // Extract shipping profiles from user data
        const userShippingProfiles = userData.map((user) => ({
          id: user.id,
          city: user.address.city,
          state: user.address.city, // Note: Change to user.address.state
          address: user.address.street,
          zipCode: user.address.zipcode,
        }));

        setShippingProfiles(userShippingProfiles);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddShippingProfile = () => {
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
    // Find the corresponding shipping profile in user data
    const editedProfile = shippingProfiles.find((profile) => profile.id === id);

    if (editedProfile) {
      setFormData({
        city: editedProfile.city,
        state: editedProfile.state,
        address: editedProfile.address,
        zipCode: editedProfile.zipCode,
      });
      setEditing(true);
    } else {
      console.error("Shipping profile not found for editing");
    }
  };

  const handleDeleteShippingProfile = (id) => {
    const updatedProfiles = shippingProfiles.filter((profile) => profile.id !== id);
    setShippingProfiles(updatedProfiles);
  };

  return (
    <div className="edituserinfo">
      {shippingProfiles.map((profile) => (
        <div key={profile.id} className="shipping-container">
          <p>{`${profile.city}, ${profile.state}, ${profile.address}, ${profile.zipCode}`}</p>
          <div>
            <button className="shippybuttons" onClick={() => handleEditShippingProfile(profile.id)}>Edit</button>
            <button className="shippybuttons" onClick={() => handleDeleteShippingProfile(profile.id)}>Delete</button>
            <button className="shippybuttons" onClick={() => handleDefaultShippingProfile(profile.id)}>Set as default</button>
          </div>
        </div>
      ))}

      {editing ? (
        <div className="newship">
          <label>City: </label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <label>State: </label>
          <input type="text" name="state" value={formData.state} onChange={handleInputChange} />

          <label>Address: </label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

          <label>Zip Code: </label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />

          <button className="punch-button" onClick={handleAddShippingProfile}>Add</button>
        </div>
      ) : (
        <div className="add-ship" onClick={() => setEditing(true)}>
          Add new shipping profile
        </div>
      )}
    </div>
  );
};

export default ShippingProfileComponent;


