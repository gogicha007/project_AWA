'use client';
import styles from './auth-form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@/utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginSchema, LoginFields } from './validation';
import Loader from '../../feedback/loader/loader';
import { useTranslations } from 'next-intl';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('AuthForm');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });
  const router = useRouter();

  const handleAuth = async (email: string, password: string) => {
    setLoading(true);
    try {
      await login(email, password);
      setError(null);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`${t('error')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<LoginFields> = async ({ email, password }) => {
    await handleAuth(email, password);
  };

  return (
    <div className={styles.auth}>
      <h1>{t('login')}</h1>
      <form className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.auth__item}>
          <label htmlFor="email" className={styles.auth__label}>
            {t('email')}
            <input
              {...register('email')}
              id="email"
              type="email"
              className={styles.auth__input}
              autoComplete="email"
            />
          </label>
          <p className={styles.auth__error}>{errors?.email?.message}</p>
        </div>
        <div className={styles.auth__item}>
          <label htmlFor="password" className={styles.auth__label}>
            {t('password')}
            <input
              {...register('password')}
              id="password"
              type="password"
              className={styles.auth__input}
              autoComplete="current-password"
            />
          </label>
          <p className={styles.auth__error + ' ' + styles.password}>
            {errors?.password?.message}
          </p>
        </div>

        <button className="button" type="submit" disabled={!isValid}>
          {t('login')}
        </button>
      </form>
      {error && (
        <h2 className={styles['auth__credentials-error']}>
          {`Error: ${error.split('Error')[1]?.replace(/[()]/g, '')}`}
        </h2>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default LoginForm;
