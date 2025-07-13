import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsOpen(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const phone = e.target.phoneNo.value.toString();
    const dob = new Date(e.target.dob.value).getTime();

    if (!e.target.username.value || !e.target.email.value || !e.target.phoneNo.value || !e.target.dob.value) {
      alert("All fields are mandatory.");
    } else if (phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (dob > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      // Clear form
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phoneNo.value = "";
      e.target.dob.value = "";
      alert("Form submitted successfully!");
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <div className="modal">
        <h1>User Details Modal</h1>
        <button onClick={clickHandler}>Open Form</button>

        {isOpen && (
          <div className="modal-overlay" onClick={closeHandler}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={submitHandler}>
                <h2>Fill Details</h2>

                <div className="input-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" name="username" id="username" required />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address:</label>
                  <input type="email" name="email" id="email" required />
                </div>

                <div className="input-group">
                  <label htmlFor="phoneNo">Phone Number:</label>
                  <input type="number" name="phoneNo" id="phoneNo" required />
                </div>

                <div className="input-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input type="date" name="dob" id="dob" required />
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
