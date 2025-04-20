import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ROLES = {
  FOUNDER: 'FOUNDER',
  VALIDATOR: 'VALIDATOR',
} as const;

export type Role = keyof typeof ROLES;

interface RoleState {
  role: Role;
  toggleRole: () => void;
  setRole: (newRole: Role) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: 'FOUNDER',

      toggleRole: () =>
        set((state) => ({
          role: state.role === 'FOUNDER' ? 'VALIDATOR' : 'FOUNDER',
        })),

      setRole: (newRole) => set({ role: newRole }),
    }),
    {
      name: 'role-storage',
    }
  )
);

export const useIsFounder = () => {
  return useRoleStore((state) => state.role === 'FOUNDER');
};
