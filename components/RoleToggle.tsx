'use client';

import React, { useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { ROLES, useRoleStore } from '@/stores/roleStore';

const RoleToggle = () => {
  const { role, setRole } = useRoleStore();

  // Using sessionStorage instead of localStorage
  useEffect(() => {
    const storedRole = sessionStorage.getItem('role-storage') || ROLES.FOUNDER;
    setRole(storedRole); // This only sets the initial role if needed
  }, [setRole]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole); // This automatically updates sessionStorage via zustand's persist
    sessionStorage.setItem('role-storage', newRole); // Manually update sessionStorage
  };

  return (
    <ToggleGroup value={role} onValueChange={handleRoleChange} type='single'>
      <ToggleGroupItem value={ROLES.FOUNDER}>Founder</ToggleGroupItem>
      <ToggleGroupItem value={ROLES.VALIDATOR}>Validator</ToggleGroupItem>
    </ToggleGroup>
  );
};

export default RoleToggle;
