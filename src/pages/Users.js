import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../features/userSlice';
import UserTable from '../components/UserTable';

const Users = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
};

export default Users;
