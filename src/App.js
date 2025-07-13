import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!username) {
      alert("Username is required.");
      return;
    }
    if (!email) {
      alert("Email is required.");
      return;
    }
    if (!dob) {
      alert("Date of birth is required.");
      return;
    }
    if (!phone) {
      alert("Phone number is required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    setShowModal(false);
  };

  return (
    <div className="modal">
      {!showModal && (
        <>
          <h1>User Details Form</h1>
          <button onClick={() => setShowModal(true)}>Open Form</button>
        </>
      )}
      {showModal && (
        <div className="modal-content" ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input id="username" type="text" value={formData.username} onChange={handleChange} />
            </div>
            <div>
              <label>Email:</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
            </div>
            <div>
              <label>Phone Number:</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
