import { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <h1>User Detail Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;