"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    Menu,
    X,
    User,
    LogOut,
    LayoutDashboard,
    Package,
    Calendar,
    Settings,
    ChevronRight,
    MessageSquareQuote,
    Users,
    Globe,
    BarChart3,
    Layers,
    Image,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Services", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Stats", href: "/admin/stats", icon: BarChart3 },
    { label: "Service Packages", href: "/admin/service-packages", icon: Layers },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Team", href: "/admin/team", icon: Users },
    { label: "Site Config", href: "/admin/site-config", icon: Globe },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        // Redirect to login if not authenticated and not on login page
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, router, pathname]);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/admin/login");
    };

    // Show loading while checking authentication
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated (except for login page)
    if (status === "unauthenticated" && pathname !== "/admin/login") {
        return null;
    }

    // For login page, just show the content without the admin sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -280, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -280, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sticky top-0 h-screen bg-white border-r-2 border-red-100 flex flex-col shadow-lg z-40 hidden lg:flex"
                    >
                        {/* Logo */}
                        <div className="p-6 border-b-2 border-red-100 flex-shrink-0">
                            <Link href="/admin/dashboard" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-white font-bold shadow-lg">
                                    J&A
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold text-gray-900 leading-tight">JADE & ANDY</h1>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold text-red-600">Admin Portal</p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                                            ${isActive
                                                ? "bg-red-50 text-red-600 font-semibold shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        <item.icon className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute right-2"
                                            >
                                                <ChevronRight className="w-4 h-4 text-red-600" />
                                            </motion.div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Section */}
                        <div className="p-4 border-t-2 border-red-100 bg-gray-50 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3 px-2">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@jadeandandy.com</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Sidebar (Fixed) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-red-100 flex flex-col shadow-lg z-50 lg:hidden"
                    >
                        {/* Logo */}
                        <div className="p-6 border-b-2 border-red-100 flex-shrink-0">
                            <Link href="/admin/dashboard" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 text-white font-bold shadow-lg">
                                    J&A
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold text-gray-900 leading-tight">JADE & ANDY</h1>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold text-red-600">Admin Portal</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                                            ${isActive
                                                ? "bg-red-50 text-red-600 font-semibold shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        <item.icon className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                                        <span className="flex-1">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Section */}
                        <div className="p-4 border-t-2 border-red-100 bg-gray-50 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3 px-2">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@jadeandandy.com</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Backdrop for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white border-b-2 border-red-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-2">
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
                            </h2>
                            <p className="text-sm text-gray-500">Manage your content</p>
                        </div>
                    </div>

                    {/* Mobile User */}
                    <div className="lg:hidden">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
