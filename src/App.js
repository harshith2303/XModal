
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.className === 'modal') {
        setShowModal(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSubmit = () => {
    if (!username || !email || !phone || !dob) {
      alert("All fields are mandatory.");
      return;
    }

    if (!email.includes('@')) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("**Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (dob > today) {
      alert("Invalid phone number. Please enter a 10-digit phone number.**");
      return;
    }


    setShowModal(false);
    setUsername('');
    setEmail('');
    setPhone('');
    setDob('');
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Username:</label><br />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br />

              <label>Email Address:</label><br />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br />

              <label>Phone Number:</label><br />
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /><br />

              <label>Date of Birth:</label><br />
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              /><br /><br />

              <input
                type="button"
                className="submit-button"
                value="Submit"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

