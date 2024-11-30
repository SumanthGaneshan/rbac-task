class User {
    constructor(id, username, email, role, status = 'Active') {
      this.id = id;
      this.username = username;
      this.email = email;
      this.role = role;
      this.status = status;
      this.permissions = [];
    }
  }
  
  // Initial users
  const initialUsers = [
    new User(1, 'admin', 'admin@example.com', 'SUPER_ADMIN'),
    new User(2, 'john_doe', 'john@example.com', 'USER')
  ];
  
  export { User, initialUsers };