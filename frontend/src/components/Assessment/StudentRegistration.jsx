import React, { useState } from 'react';

const StudentRegistration = ({ onRegister }) => {
  const [formData, setFormData] = useState({ name: '', id: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Name and Email remain required, ID is now optional
    if (formData.name && formData.email) {
      onRegister(formData);
    } else {
      alert("Please fill in the required fields (Name and Email).");
    }
  };

  return (
    <div style={styles.modal}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Full Name" 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          style={styles.input} 
          required 
        />
        <input 
          placeholder="Student ID (Optional)" 
          onChange={e => setFormData({...formData, id: e.target.value})} 
          style={styles.input} 
        />
        <input 
          placeholder="University Email" 
          type="email" 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          style={styles.input} 
          required 
        />
        <button type="submit" style={styles.button}>CONFIRM IDENTITY</button>
      </form>
    </div>
  );
};

const styles = {
  modal: { padding: '40px', border: '2px solid #1890ff', borderRadius: '8px', width: '350px', margin: '50px auto' },
  input: { display: 'block', width: '100%', marginBottom: '10px', padding: '8px' },
  button: { width: '100%', padding: '10px', background: '#1890ff', color: '#fff', border: 'none', cursor: 'pointer' }
};

export default StudentRegistration;