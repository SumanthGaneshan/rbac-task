import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/userSlice';
import { toast } from 'react-toastify';

const AddUser = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  // const { error } = useSelector((state) => state.users);
  
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
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await dispatch(addUser(userData)).unwrap();
        
        toast.success(`${result.data.role} ${result.data.username} added successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        setUserData({
          username: '',
          email: '',
          role: 'USER'
        });
      } catch (error) {

      }
    }
  };

  return (
    <div className={`${theme} bg-white dark:bg-gray-900 shadow-md rounded-lg p-0`}>
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Add New User</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Username</label>
          <input 
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className={`
              w-full p-2 border rounded
              ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              dark:bg-gray-800 dark:text-white
            `}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className={`
              w-full p-2 border rounded
              ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              dark:bg-gray-800 dark:text-white
            `}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
              dark:bg-blue-600 dark:hover:bg-blue-700
              transition
            "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;