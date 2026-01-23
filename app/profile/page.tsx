'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User, Mail, LogOut, Calendar, MapPin, Settings, Car, Wrench, Clock, ShieldCheck, Plus } from "lucide-react";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview");

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center max-w-md bg-white p-10 shadow-xl border-t-4 border-red-600">
                    <ShieldCheck size={48} className="mx-auto text-red-600 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">Access Denied</h2>
                    <p className="text-gray-500 mb-8">Please sign in to access your personal dashboard and vehicle history.</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-sm font-bold uppercase tracking-wider text-white bg-black hover:bg-red-700 transition-colors duration-300"
                    >
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* HEADER BANNER */}
            <div className="h-64 bg-[#111] relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">

                {/* PROFILE CARD */}
                <div className="bg-white shadow-xl rounded-sm p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-end gap-6 border-b border-gray-200">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 relative">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="User"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                            <Settings size={14} />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left mb-2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{session?.user?.name || "Valued Customer"}</h1>
                        <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 text-sm">
                            <Mail size={14} /> {session?.user?.email}
                            <span className="hidden sm:inline text-gray-300">|</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> Member since 2026</span>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors uppercase tracking-wide"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* DASHBOARD CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">

                    {/* LEFT SIDEBAR NAVIGATION */}
                    <div className="lg:col-span-1">
                        <nav className="bg-white shadow-sm rounded-sm overflow-hidden sticky top-28">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 text-sm font-medium border-l-4 transition-all ${activeTab === "overview" ? "border-red-600 bg-red-50 text-red-700" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                            >
                                <User size={18} /> Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("vehicles")}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 text-sm font-medium border-l-4 transition-all ${activeTab === "vehicles" ? "border-red-600 bg-red-50 text-red-700" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                            >
                                <Car size={18} /> My Vehicles
                            </button>
                            <button
                                onClick={() => setActiveTab("services")}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 text-sm font-medium border-l-4 transition-all ${activeTab === "services" ? "border-red-600 bg-red-50 text-red-700" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                            >
                                <Wrench size={18} /> Service History
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`w-full text-left px-6 py-4 flex items-center gap-3 text-sm font-medium border-l-4 transition-all ${activeTab === "settings" ? "border-red-600 bg-red-50 text-red-700" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                            >
                                <Settings size={18} /> Account Settings
                            </button>
                        </nav>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* STATS ROW */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white p-6 shadow-sm border-t-2 border-blue-500">
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Total Services</div>
                                <div className="text-3xl font-extrabold text-gray-900">0</div>
                            </div>
                            <div className="bg-white p-6 shadow-sm border-t-2 border-green-500">
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Active Vehicles</div>
                                <div className="text-3xl font-extrabold text-gray-900">1</div>
                            </div>
                            <div className="bg-white p-6 shadow-sm border-t-2 border-red-500">
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Loyalty Points</div>
                                <div className="text-3xl font-extrabold text-gray-900">150</div>
                            </div>
                        </div>

                        {/* OVERVIEW TAB CONTENT */}
                        {activeTab === "overview" && (
                            <div className="bg-white shadow-sm p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Clock size={20} className="text-red-600" /> Upcoming Appointments
                                </h3>

                                <div className="bg-gray-50 border border-gray-100 p-8 text-center rounded-sm">
                                    <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-4">
                                        <Calendar size={32} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-900 font-medium">No upcoming appointments scheduled.</p>
                                    <p className="text-gray-500 text-sm mb-6 mt-1">Book a service now to keep your vehicle in top condition.</p>
                                    <Link href="/services" className="inline-block bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                                        Book Service
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* VEHICLES TAB CONTENT */}
                        {activeTab === "vehicles" && (
                            <div className="bg-white shadow-sm p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">My Garage</h3>
                                    <button className="flex items-center gap-2 text-red-600 text-sm font-bold uppercase hover:text-black transition">
                                        <Plus size={16} /> Add Vehicle
                                    </button>
                                </div>

                                <div className="border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-full md:w-1/3 bg-gray-100 h-40 flex items-center justify-center text-gray-400">
                                        <Car size={48} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900">2026 Tesla Model S</h4>
                                        <p className="text-gray-500 text-sm mb-4">VIN: •••••••••••8291</p>
                                        <div className="flex gap-3 text-sm">
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
                                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Primary</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="px-5 py-2 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">Details</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PLACEHOLDER FOR OTHER TABS */}
                        {(activeTab === "services" || activeTab === "settings") && (
                            <div className="bg-white shadow-sm p-12 text-center">
                                <Settings size={48} className="mx-auto text-gray-300 mb-4 animate-spin-slow" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Work in Progress</h3>
                                <p className="text-gray-500">This section is currently under development.</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
