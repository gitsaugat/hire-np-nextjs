import React, { Suspense } from 'react';
import AuthPage from '@/components/auth/AuthPage';

export const metadata = {
  title: "Sign In or Sign Up — HireNP ",
  description: "Join HireNP as a candidate looking for work or a company ready to hire. Nepal's first AI-powered hiring platform.",
};

export default function Auth() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f7faf9]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4f3c]"></div>
      </div>
    }>
      <AuthPage />
    </Suspense>
  );
}
