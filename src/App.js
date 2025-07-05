import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!username || !email || !dob || !phone) {
      alert("All fields are mandatory.");
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
              <input id="username" type="text" />
            </div>
            <div>
              <label>Email:</label>
              <input id="email" type="email" />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input id="dob" type="date" />
            </div>
            <div>
              <label>Phone Number:</label>
              <input id="phone" type="tel" />
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
