'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { setCookie } from 'nookies';
import { auth, logout } from '@/utils/firebaseConfig';
import { isTokenExpired } from '@/utils/authUtils';
import { useRouter, usePathname } from 'next/navigation';
import { usersApi } from '@/api/endpoints/users';

export const AuthContext = createContext<{
  currentUser: User | null;
  dbUserId: number | null;
  loading: boolean;
}>({
  currentUser: null,
  dbUserId: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  const handleTokenExpiration = useCallback(
    async (user: User) => {
      if (!user) return null;
      const expired = await isTokenExpired(user);
      if (expired) {
        await logout();
        router.push('/');
        return null;
      }
      const token = await user.getIdToken();
      setCookie(null, 'authToken', token, {
        path: '/',
        maxAge: 60 * 60 * 24,
      });
      return user;
    },
    [router]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const validatedUser = user ? await handleTokenExpiration(user) : null;
        setCurrentUser(validatedUser);
        if (validatedUser) {
          const res = await usersApi.getByFBUid(validatedUser.uid);
          if (res.id) {
            setDbUserId(+res.id);
          } else setDbUserId(null);
        } else setDbUserId(null);
      } catch (error) {
        console.error('Auth state change error:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [handleTokenExpiration]);

  useEffect(() => {
    if (currentUser) {
      handleTokenExpiration(currentUser).then((validUser) => {
        if (!validUser && currentUser) {
          setCurrentUser(null);
        }
      });
    }
  }, [pathName, currentUser, handleTokenExpiration]);

  return (
    <AuthContext.Provider value={{ currentUser, dbUserId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
