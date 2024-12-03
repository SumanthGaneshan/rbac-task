import React from 'react';
import { Trash2Icon, EditIcon } from 'lucide-react';

const UserTable = ({ 
  filteredUsers, 
  loading, 
  handleStatusChange, 
  handleEdit, 
  handleDelete 
}) => {
  return (
    <div className="w-full overflow-x-auto shadow-md">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left text-gray-600 dark:text-gray-300 whitespace-nowrap">Username</th>
            <th className="p-3 text-left text-gray-600 dark:text-gray-300 whitespace-nowrap">Email</th>
            <th className="p-3 text-left text-gray-600 dark:text-gray-300 whitespace-nowrap">Role</th>
            <th className="p-3 text-center text-gray-600 dark:text-gray-300 whitespace-nowrap">Status</th>
            <th className="p-3 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center p-4 dark:text-white">
                Loading...
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 dark:text-white">
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr
                key={user.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 text-gray-800 dark:text-white text-sm whitespace-nowrap">{user.username}</td>
                <td className="p-3 text-gray-800 dark:text-white text-sm whitespace-nowrap">{user.email}</td>
                <td className="p-3 text-gray-800 dark:text-white text-sm whitespace-nowrap">{user.role}</td>
                <td className="p-3 text-center whitespace-nowrap">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className="p-1 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-500"
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
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
  );
};

export default UserTable;