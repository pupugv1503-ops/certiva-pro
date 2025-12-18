import fs from 'fs';
import path from 'path';

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]), 'utf8');
};

export const readUsers = (): StoredUser[] => {
  ensureStore();
  const raw = fs.readFileSync(usersFile, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
};

export const writeUsers = (users: StoredUser[]) => {
  ensureStore();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
};

export const findUserByEmail = (email: string): StoredUser | undefined => {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const createUser = (user: StoredUser): StoredUser => {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
};
