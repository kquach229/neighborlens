import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ROLES = {
  FOUNDER: 'FOUNDER',
  VALIDATOR: 'VALIDATOR',
};

export const useRoleStore = create(
  persist(
    (set) => ({
      role: 'FOUNDER', // Default role

      // Toggles between FOUNDER and VALIDATOR
      toggleRole: () =>
        set((state) => ({
          role: state.role === 'FOUNDER' ? 'VALIDATOR' : 'FOUNDER',
        })),

      // Directly set role (e.g., setRole('VALIDATOR'))
      setRole: (newRole) => set({ role: newRole }),
    }),
    {
      name: 'role-storage', // Key used to store the role in localStorage automatically
    }
  )
);

// Helper to check if current role is founder
export const useIsFounder = () => {
  return useRoleStore((state) => state.role === 'FOUNDER');
};
