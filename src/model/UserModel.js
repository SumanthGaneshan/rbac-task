class User {
  constructor(id, username, email, role, status = 'Active') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.status = status;
    this.permissions = this.setPermissionsByRole(role);
  }

  setPermissionsByRole(role) {
    switch(role) {
      case 'SUPER_ADMIN':
        return ['add','view', 'edit', 'delete'];
      case 'ADMIN':
        return ['add','view', 'edit'];
      case 'USER':
        return ['view'];
      default:
        return ['view'];
    }
  }
}

const initialUsers = [
  new User(1, 'admin', 'admin@mail.com', 'SUPER_ADMIN'),
  new User(2, 'john_admin', 'john_admin@mail.com', 'ADMIN'),
  new User(3, 'jane_admin', 'jane_admin@mail.com', 'ADMIN'),
  new User(4, 'smith_admin', 'smith_admin@mail.com', 'ADMIN'),
  new User(5, 'john_doe', 'john_doe@mail.com', 'USER'),
  new User(6, 'jane_doe', 'jane_doe@mail.com', 'USER'),
  new User(7, 'alice', 'alice@mail.com', 'USER'),
  new User(8, 'bob', 'bob@mail.com', 'USER'),
  new User(9, 'charlie', 'charlie@mail.com', 'USER'),
  new User(10, 'eve', 'eve@mail.com', 'USER'),
  new User(11, 'rocky', 'rocky@mail.com', 'USER'),
];



export { User, initialUsers };