'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, Phone, ArrowLeft } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign up attempt:', formData);
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

            {/* Sign Up Card */}
            <div className="w-full max-w-md bg-white rounded-none shadow-xl overflow-hidden border-t-4 border-[#D80000]">
                <div className="p-8 sm:p-10">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
                            Create Account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Join us for premium car service & support
                        </p>
                    </div>

                    {/* Social Sign Up */}
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
                            <span className="px-4 bg-white text-gray-500">Or register with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="+1 (555) 000-0000"
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
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#D80000] focus:border-[#D80000] sm:text-sm transition-all rounded-sm bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="h-4 w-4 text-[#D80000] focus:ring-[#D80000] border-gray-300 rounded cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="text-gray-600 cursor-pointer">
                                    I agree to the{' '}
                                    <Link href="/terms" className="font-semibold text-[#D80000] hover:text-black transition-colors">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="font-semibold text-[#D80000] hover:text-black transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider text-white bg-[#D80000] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D80000] transition-all duration-300 shadow-sm mt-2"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center bg-gray-50 -mx-10 -mb-10 py-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-[#D80000] hover:text-black transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
