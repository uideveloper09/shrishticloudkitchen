export interface StoredUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  referralCode?: string;
}

declare global {
  var __users: StoredUser[] | undefined;
}

const users = (globalThis.__users ??= []);

export function addUser(user: Omit<StoredUser, "id">): StoredUser {
  const id = "user-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
  const newUser = { ...user, id };
  users.push(newUser);
  return newUser;
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUsers(): StoredUser[] {
  return [...users];
}
