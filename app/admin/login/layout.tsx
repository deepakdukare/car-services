"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If user is already logged in, redirect to dashboard
        if (status === "authenticated" && session) {
            router.push("/admin/dashboard");
        }
    }, [status, session, router]);

    // Show loading state while checking authentication
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Only show login page if user is not authenticated
    if (status === "unauthenticated") {
        return <>{children}</>;
    }

    return null;
}
