import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  MenuIcon, 
  UsersIcon, 
  UserPlusIcon, 
  LogOutIcon 
} from 'lucide-react';
import { logout } from '../features/authSlice';
import UserListing from './UserListing';
import AddUser from './AddUser';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-gray-800 text-white 
          transition-all duration-300 
          overflow-hidden
        `}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            text-xl font-bold
          `}>
            Admin Panel
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10">
          <button 
            onClick={() => setActiveTab('list')}
            className={`
              w-full flex items-center p-4 
              ${activeTab === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            <UsersIcon className="h-5 w-5 mr-3" />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>
              User List
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('add')}
            className={`
              w-full flex items-center p-4 
              ${activeTab === 'add' ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            <UserPlusIcon className="h-5 w-5 mr-3" />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>
              Add User
            </span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-4 hover:bg-gray-700"
          >
            <LogOutIcon className="h-5 w-5 mr-3" />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold">
            {activeTab === 'list' ? 'User List' : 'Add User'}
          </h1>
        </header>

        <main className="p-6">
          {activeTab === 'list' ? <UserListing /> : <AddUser />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;