
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const useAdminRole = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);

  useEffect(() => {
    if (user) {
      // Simple hardcoded admin check
      const isAdminUser = user.email === 'admin@admin.com' || user.email === 'sammysaasproject@gmail.com';
      console.log('Admin check for:', user.email, 'Is admin:', isAdminUser);
      setIsAdmin(isAdminUser);
      setAdminCheckComplete(true);
    } else {
      setIsAdmin(false);
      setAdminCheckComplete(true);
    }
  }, [user]);

  return { isAdmin, adminCheckComplete };
};
