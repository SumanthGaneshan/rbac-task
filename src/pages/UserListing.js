import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, changeUserStatus } from '../features/userSlice';
import EditUserModal from '../components/EditUserModal';
import { toast } from 'react-toastify';
import { Pagination } from '@mui/material';
import UserTable from '../components/UserTable';

const UserListing = () => {
  const dispatch = useDispatch();
  const { users, loading, total } = useSelector(state => state.users);
  const { user: loggedInUser } = useSelector(state => state.auth);
  const theme = useSelector((state) => state.theme.mode);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(fetchUsers({ page, searchTerm, statusFilter }));
  }, [dispatch, page, searchTerm, statusFilter]);


  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser({
          userId,
          currentUser: loggedInUser
        })).unwrap()
        toast.success(`Deleted successfully!`);
        dispatch(fetchUsers({ page, searchTerm, statusFilter }));
      } catch (error) {
        toast.error(error.message);
      }
    };
  }

  const handleStatusChange = async (userId, newStatus) => {
    await dispatch(changeUserStatus({ userId, newStatus })).unwrap();
    toast.success(`Status changed to ${newStatus}`, {
      position: "top-right",
      autoClose: 3000,
    });
    setStatusFilter('');
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={`${theme} bg-white dark:bg-gray-900  rounded-lg`}>
      <div className="border-b dark:border-gray-700 py-6 flex items-end gap-4 flex-wrap">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />

        {/* Status Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="statusFilter"
            className="text-sm font-medium text-gray-700 dark:text-white mb-2"
          >
            Status Filter
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>



      <UserTable
        filteredUsers={users}
        loading={loading}
        handleStatusChange={handleStatusChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <div className="p-4 flex justify-center items-center dark:text-white">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Total Results: {total}
        </div>
        <Pagination
          count={Math.ceil(total / 15)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape='rounded'
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme === 'dark' ? 'white' : 'black',
              '&.Mui-selected': {
                backgroundColor: 'primary',
                color: 'white'
              },
              '&:hover': {
                backgroundColor: theme === 'dark' ? '#555' : '#f0f0f0'
              }
            },
            '& .MuiPaginationItem-icon': {
              color: theme === 'dark' ? 'white' : 'black'
            }
          }}
        />
      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserListing;