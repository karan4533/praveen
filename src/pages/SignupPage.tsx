
import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SignupForm } from '@/components/auth/SignupForm';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageLayout>
      <div className="container flex flex-col items-center justify-center gap-4 py-8 md:py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Sign up to get your personalized news experience
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default SignupPage;
