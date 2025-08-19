'use client';

import styles from './auth-bar.module.css';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { logout } from '@/utils/firebaseConfig';
import { useEffect, useState } from 'react';

const AuthBar = () => {
  const { currentUser } = useAuth();
  const tA = useTranslations('AuthForm');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const signOut = () => {
    logout();
    router.push('/');
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div>
        <div className={styles['auth-bar__login']}>
          <button className={styles['auth-bar__button']} disabled>
            Loading...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!currentUser && (
        <div className={styles['auth-bar__login']}>
          <button className={styles['auth-bar__button']} onClick={() => router.push('/auth/sign-up')}>
            {tA('register')}
          </button>
          <button className={styles['auth-bar__button']} onClick={() => router.push('/auth/sign-in')}>
            {tA('login')}
          </button>
        </div>
      )}
      {currentUser && (
        <div className={styles['auth-bar__logout']}>
          <button className={styles['auth-bar__button']} onClick={signOut}>
            {tA('logout')}, {currentUser.email}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
