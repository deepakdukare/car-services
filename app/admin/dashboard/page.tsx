
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const services = await prisma.serviceItem.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const categories = await prisma.serviceCategory.findMany({
        select: {
            id: true,
            title: true
        }
    });

    const totalServices = await prisma.serviceItem.count();
    const totalCategories = await prisma.serviceCategory.count();

    const highValueServices = services.filter(s => s.price.includes('500') || s.price.includes('800') || s.price.includes('900') || s.price.includes('1000')).length;

    const stats = {
        totalServices,
        totalCategories,
        highValueServices
    };

    return <AdminDashboardClient services={services} categories={categories} stats={stats} />;
}
