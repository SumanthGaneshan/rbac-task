import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MenuIcon,
  UsersIcon,
  UserPlusIcon,
  ChevronDownIcon,
  LogOutIcon,
  BarChartIcon
} from 'lucide-react';
import { toggleTheme } from '../features/themeSlice';
import { logout } from '../features/authSlice';
import UserListing from './UserListing';
import AddUser from './AddUser';
import UserStatistics from './UserStatistics';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current theme and user from Redux
  const theme = useSelector((state) => state.theme.mode);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSidebar= (currTab)=>{
    setActiveTab(currTab);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }

  return (
    <div className={`${theme} flex h-screen`}>
      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? 'w-64' : 'w-16'}
          bg-gray-800 text-white 
          transition-all duration-300 
          overflow-hidden
          max-lg:absolute max-lg:h-screen
          z-50
        `}
      >
        <div className="flex items-center justify-between p-4">
          <h2
            className={`
              ${isSidebarOpen ? 'block' : 'hidden'} 
              text-md font-bold
            `}
          >
            RBAC Task
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10 text-sm">
          <button
            onClick={() =>{
              
              handleSidebar('list')}}
            className={`
              w-full flex items-center py-3 ${isSidebarOpen ? 'px-3' : 'justify-center'} 
              ${activeTab === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            <UsersIcon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`} />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>User List</span>
          </button>

          <button
            onClick={() =>{
              handleSidebar('add')}}
            className={`
              w-full flex items-center py-3 ${isSidebarOpen ? 'px-3' : 'justify-center'} 
              ${activeTab === 'add' ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            <UserPlusIcon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`} />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Add User</span>
          </button>

          <button
            onClick={() => {
              handleSidebar('statistics')}}
            className={`
              w-full flex items-center py-3 ${isSidebarOpen ? 'px-3' : 'justify-center'} 
              ${activeTab === 'statistics' ? 'bg-gray-700' : 'hover:bg-gray-700'}
            `}
          >
            <BarChartIcon
              className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
            />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>User Statistics</span>
          </button>
        </nav>
      </div>


      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 max-lg:ml-[64px]">
            {activeTab === 'list' ? 'User List' :
              activeTab === 'add' ? 'Add User' :
                'Statistics'}
          </h3>

          <div className='flex justify-end'>
            <button
              onClick={handleThemeToggle}
              className="p-2 mr-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div className="relative group text-sm">
              <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {user?.username}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
              </button>

              <div
                className="
              absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg 
              invisible group-hover:visible 
              opacity-0 group-hover:opacity-100 
              transition-all duration-300 
              z-20
            "
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center text-gray-800 dark:text-gray-100"
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

        </header>

        <main className="p-6 max-lg:ml-[64px]"> 
          {activeTab === 'list' ? <UserListing /> :
            activeTab === 'add' ? <AddUser /> :
              <UserStatistics />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
