const users = [];
let idCounter = 1;

export function findByEmail(email) {
  return users.find((u) => u.email === email);
}

export function createUser({ email, passwordHash }) {
  const user = { id: idCounter++, email, passwordHash };
  users.push(user);
  return user;
}

export function allUsers() {
  return users.map(({ passwordHash, ...rest }) => rest);
}
