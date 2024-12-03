
# RBAC Dashboard Project

### Dashboard Link [Live Demo](https://sumanthganeshan.github.io/rbac-task)
#### Credential
		username - admin@mail.com
		password - admin123

## Project Overview

This is a Role-Based Access Control (RBAC) Dashboard. The application provides a comprehensive user and role management system with dynamic access controls.

## Technologies Used

- React.js
- Redux Toolkit
- Tailwind CSS
- Material UI

## Setup Instructions

### Installation Steps

1. Clone the Repository
```bash
git clone https://github.com/sumanthganeshan/rbac-task.git
cd rbac-task
```

2. Install Dependencies
```bash
npm install
```

3. Start the Application
```bash
npm start
```

## Login Credentials

### Super Admin Access
- **Username**: admin@mail.com
- **Password**: admin123

Note: Alternative admin credentials are available in the usermodel file's initial users

## Core Features

### Authentication
- Restricted login (only admin/super admin access)

### User Management
- Add new users
- Edit user details
- Change user status (Active/Inactive)
- Only Super Admin can delete users

### Role Management
-    There are three roles: Superadmin, Admin, and User.  
-   Superadmin and Admin have the ability to assign and modify the roles of others.

### Dynamic Permissions

- Superadmin - add, view, edit delete
-  Admin - add, view,edit 
- User - view

### API Simulation
Custom API simulation implemented using:
- Promise
- setTimeout
- Simulated server-like response

## Additional Features
- Search functionality
- Status Filter(Active/Inactive)
- Pagination
- User statistics (used recharts)
	- Donut charts for:
	  - User status (Active/Inactive)
	  - Users per role
- Theme switcher (Light/Dark mode)

## Project Structure

- `src/`
  - `components/`
  - `features/`
  - `model/`
  - `pages/`
  
