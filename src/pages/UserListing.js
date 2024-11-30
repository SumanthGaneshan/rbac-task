import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUser } from '../features/userSlice';
import { 
  Trash2Icon, 
  EditIcon 
} from 'lucide-react';

const UserListing = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg">
      {/* Search Input */}
      <div className="p-4 border-b">
        <input 
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left hidden md:table-cell">Email</th>
              <th className="p-3 text-left hidden sm:table-cell">Role</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr 
                  key={user.id} 
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 hidden md:table-cell">{user.email}</td>
                  <td className="p-3 hidden sm:table-cell">{user.role}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => {/* Edit functionality */}}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <EditIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2Icon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (optional) */}
      <div className="p-4 flex justify-between items-center">
        <span>Total Users: {filteredUsers.length}</span>
      </div>
    </div>
  );
};

export default UserListing;