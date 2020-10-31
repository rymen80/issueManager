import React from 'react';
import { useUserView } from '../UserHooks';

export const UserSingleView = () => {
  const { selectedUser } = useUserView();

  return <h1>Single User View</h1>;
};
