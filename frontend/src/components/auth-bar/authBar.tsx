import styles from './auth-bar.module.css';
import { useRouter } from 'next/navigation';

const AuthBar = () => {
  const currentUser = { email: 'email' };
  const router = useRouter();
  const signOut = () => {
    console.log('sign out');
    router.push('/');
  };

  return (
    <div>
      {!currentUser && (
        <div className={styles['auth-bar__login']}>
          <button className="button" onClick={() => router.push('/sign-up')}>
            register
          </button>
          <button className="button" onClick={() => router.push('/sign-in')}>
            login
          </button>
        </div>
      )}
      {currentUser && (
        <div className={styles['auth-bar__logout']}>
          <button className="button" onClick={signOut}>
            logout, {currentUser.email}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
