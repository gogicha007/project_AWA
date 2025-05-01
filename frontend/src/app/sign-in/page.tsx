'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import LoginForm from '@/components/auth-form/loginForm';
import Loading from '@/components/loader/loader';

const SignIn = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.push('/');
    }
  }, [router, loading, currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return null;
  }

  return <LoginForm />;
};

export default SignIn;