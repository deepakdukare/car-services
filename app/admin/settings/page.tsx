import { prisma } from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const siteConfig = await prisma.siteConfig.findUnique({
        where: { id: 1 }
    });

    const stats = await prisma.stats.findMany({
        orderBy: { id: 'asc' }
    });

    const servicePackages = await prisma.servicePackage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return <SettingsClient siteConfig={siteConfig} stats={stats} servicePackages={servicePackages} />;
}
