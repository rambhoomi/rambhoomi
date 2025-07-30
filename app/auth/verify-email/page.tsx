'use client';

import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'email') {
        setLoading(true);
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email',
          });

          if (error) {
            setError(error.message);
          } else {
            setSuccess(true);
            // Redirect to dashboard after successful verification
            setTimeout(() => {
              router.push('/');
            }, 3000);
          }
        } catch (err) {
          setError('An unexpected error occurred during verification');
        } finally {
          setLoading(false);
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, supabase.auth, router]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    setError('');
    
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (user.user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.user.email,
        });

        if (error) {
          setError(error.message);
        } else {
          setResendSuccess(true);
          setTimeout(() => setResendSuccess(false), 5000);
        }
      } else {
        setError('No email found. Please sign up again.');
      }
    } catch (err) {
      setError('Failed to resend verification email');
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now access your account.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Go to Dashboard
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting automatically in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600 mb-8">
              We've sent a verification link to your email address. Please check your email and click the link to verify your account.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              Verification email sent successfully! Please check your inbox.
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={resendLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              {resendLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              Can't find the email? Check your spam folder or contact support if you continue to have issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}