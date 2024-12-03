import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/userSlice';
import { XIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const EditUserModal = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(userData)).unwrap();
      
      toast.success(`Updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      onClose();
    } catch (error) {
    }
  };


  if (!isOpen) return null;

  return (
    <div className={`${theme} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit User</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md 
                dark:bg-gray-700 dark:text-white 
                border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md 
                dark:bg-gray-700 dark:text-white
                border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md 
                dark:bg-gray-700 dark:text-white 
                border-gray-300 dark:border-gray-600"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 
                dark:bg-gray-600 dark:text-white
                rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white 
                dark:bg-blue-600
                rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;