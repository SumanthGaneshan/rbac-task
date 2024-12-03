import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const UserStatistics = () => {
  const { allUsers } = useSelector((state) => state.users);

  const activeUsers = allUsers.filter(user => user.status === 'Active').length;
  const inactiveUsers = allUsers.filter(user => user.status === 'Inactive').length;

  const roleCounts = allUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    { name: 'Active', value: activeUsers, color: '#4CAF50' },
    { name: 'Inactive', value: inactiveUsers, color: '#F44336' }
  ];

  const roleData = Object.entries(roleCounts).map(([name, value]) => ({
    name,
    value,
    color: name === 'SUPER_ADMIN' ? '#2196F3' 
      : name === 'ADMIN' ? '#FF9800' 
      : '#9C27B0',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
      {/* User Status Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-md font-semibold mb-4 text-gray-800 dark:text-gray-100">
          User Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* User Roles Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-md font-semibold mb-4 text-gray-800 dark:text-gray-100">
          User Roles Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStatistics;