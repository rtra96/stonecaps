//experimental code
import React, { useState, useEffect } from "react";

const ShippingProfileComponent = () => {
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shippingProfiles, setShippingProfiles] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    zipCode: "",
  });

  // Simulate fetching logged-in user data
  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        // Retrieve user info from local storage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        // Check if userInfo is available
        if (!userInfo) {
          console.error("User info not found in local storage");
          return;
        }

        // Fetch specific user data based on the logged-in user details
        const response = await fetch(`https://fakestoreapi.com/users/${userInfo.id}`);
        const userData = await response.json();

        // Extract shipping profiles from user data
        const userShippingProfiles = [
          {
            id: userData.id,
            city: userData.address.city,
            address: userData.address.street,
            zipCode: userData.address.zipcode,
          },
        ];

        setShippingProfiles(userShippingProfiles);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchLoggedInUserData();
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
      setShowForm(false);
    } else {
      console.error("Error: All fields are required for adding a shipping profile");
    }
  };

  const handleCancelAddShippingProfile = () => {
    setEditing(false);
    setShowForm(false);
    setFormData({
      city: "",
      state: "",
      address: "",
      zipCode: "",
    });
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
    const updatedProfiles = shippingProfiles.find((profile) => profile.id === id);
    setShippingProfiles(updatedProfiles);
  };

  const handleSetAsDefaultShippingProfile = (id) => {
    // Find the corresponding shipping profile in user data
    const defaultProfile = shippingProfiles.find((profile) => profile.id === id);

    if (defaultProfile) {
      // Update the default shipping profile in local storage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, defaultShippingProfile: defaultProfile }));
    } else {
      console.error("Shipping profile not found for setting as default");
    }
  };

  return (
    <div className="edituserinfo">
      {shippingProfiles.map((profile) => (
        <div key={profile.id} className="shipping-container">
          <p>{`${profile.city}${profile.state ? `, ${profile.state}` : ''}, ${profile.address}, ${profile.zipCode}`}</p>
          <div>
            <button className="shippybuttons" onClick={() => handleEditShippingProfile(profile.id)}>Edit</button>
            <button className="shippybuttons" onClick={() => handleDeleteShippingProfile(profile.id)}>Delete</button>
            <button className="shippybuttons" onClick={() => handleSetAsDefaultShippingProfile(profile.id)}>Set as default</button>
          </div>
        </div>
      ))}

{showForm && (
        <div className="newship">
          <label>State: </label>
          <input type="text" name="state" value={formData.state} onChange={handleInputChange} />          
          
          <label>City: </label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <label>Address: </label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

          <label>Zip Code: </label>
          <input type="text" name="zipCode" value={formData.zipcode} onChange={handleInputChange} />
          
          <button className="punch-button" onClick={handleAddShippingProfile}>
            Add
          </button>
          <button className="punch-button" onClick={handleCancelAddShippingProfile}>
            Cancel
          </button>
        </div>
      )}

      {!editing && (
        <div className="add-ship" onClick={() => setShowForm(true)}>
          Add new shipping profile
        </div>
      )}
    </div>
  );
};

export default ShippingProfileComponent;