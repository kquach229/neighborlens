'use client';

import React, { useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { ROLES, useRoleStore, Role } from '@/stores/roleStore';

const RoleToggle = () => {
  const role = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

  useEffect(() => {
    const stored = sessionStorage.getItem('role-storage');
    if (stored === ROLES.FOUNDER || stored === ROLES.VALIDATOR) {
      setRole(stored);
    } else {
      setRole(ROLES.FOUNDER); // fallback
    }
  }, [setRole]);

  const handleRoleChange = (newRole: string) => {
    if (newRole !== ROLES.FOUNDER && newRole !== ROLES.VALIDATOR) return;
    setRole(newRole as Role);
    sessionStorage.setItem('role-storage', newRole);
  };

  return (
    <ToggleGroup value={role} onValueChange={handleRoleChange} type='single'>
      <ToggleGroupItem value={ROLES.FOUNDER}>Founder</ToggleGroupItem>
      <ToggleGroupItem value={ROLES.VALIDATOR}>Validator</ToggleGroupItem>
    </ToggleGroup>
  );
};

export default RoleToggle;
