// src/pages/CreateGroup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css';

const CreateGroup = () => {
  const [form, setForm] = useState({ name: '', description: '', category: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/groups`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/groups/${res.data._id}`);
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to create group');
      alert(err.response?.data?.message || 'Failed to create group');
    }
  };

  return (
    <div className="create-group-container">
      <form onSubmit={handleSubmit} className="create-group-form">
        <h2>Create New Group</h2>
        <input
          type="text"
          name="name"
          placeholder="Group Name"
          value={form.name}
          onChange={handleChange}
          required
          className="create-group-input"
        />
        <textarea
          name="description"
          placeholder="Group Description"
          value={form.description}
          onChange={handleChange}
          required
          className="create-group-textarea"
        ></textarea>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="create-group-input"
        />
        <button type="submit" className="create-group-button">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
