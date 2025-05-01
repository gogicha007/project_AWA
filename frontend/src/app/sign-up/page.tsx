'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import RegisterForm from '@/components/auth-form/registerForm';
import Loading from '@/components/loader/loader';

const SignUp = () => {
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

  return <RegisterForm />;
};

export default SignUp;
