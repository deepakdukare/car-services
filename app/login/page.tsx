'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, ArrowLeft } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password, rememberMe });
    };

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-[#D80000] transition-colors font-medium"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
            </Link>

            {/* Login Card */}
            <div className="w-full max-w-md bg-white rounded-none shadow-xl overflow-hidden border-t-4 border-[#D80000]">
                <div className="p-8 sm:p-10">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access your account dashboard
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="mb-8">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200 group"
                        >
                            <FaGoogle className="text-gray-700 text-lg mr-3 group-hover:text-[#D80000] transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-[#D80000] transition-colors">Continue with Google</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-[#D80000] focus:ring-[#D80000] border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-semibold text-[#D80000] hover:text-red-700 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider text-white bg-[#D80000] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D80000] transition-all duration-300 shadow-sm"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <User className="h-5 w-5 text-red-300 group-hover:text-gray-500 transition-colors" />
                                </span>
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center bg-gray-50 -mx-10 -mb-10 py-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-bold text-[#D80000] hover:text-black transition-colors">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
