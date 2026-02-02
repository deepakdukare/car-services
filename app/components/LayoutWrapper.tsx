"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthProvider from "./AuthProvider";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isApiDocs = pathname?.startsWith("/api-docs");
    const isLogin = pathname === "/login";

    if (isAdmin || isApiDocs || isLogin) {
        return <AuthProvider>{children}</AuthProvider>;
    }

    return (
        <AuthProvider>
            <Navbar />
            {children}
            <Footer />
        </AuthProvider>
    );
}
