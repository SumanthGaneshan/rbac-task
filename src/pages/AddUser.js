import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';

const AddUser = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: 'USER'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addUser(userData));
      
      // Reset form
      setUserData({
        username: '',
        email: '',
        role: 'USER'
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Add New User</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Username</label>
          <input 
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className={`
              w-full p-2 border rounded
              ${errors.username ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input 
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className={`
              w-full p-2 border rounded
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="
              bg-blue-500 text-white 
              px-4 py-2 rounded 
              hover:bg-blue-600 
              transition
            "
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;