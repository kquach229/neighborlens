import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
  setUser: (user: User) => void;
  updateCredits: (credits: number) => void;
}

export const useUserStore = create<User>((set) => ({
  id: '',
  email: '',
  name: '',
  avatarUrl: '',
  credits: 1,
  createdAt: '',
  updatedAt: '',
  setUser: (user) => set({ ...user }),
  updateCredits: (credits) => set({ credits }),
}));
