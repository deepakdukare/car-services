import { prisma } from "@/lib/prisma";
import StatsClient from "./StatsClient";

export default async function StatsPage() {
    let stats = await prisma.stats.findMany({
        orderBy: { createdAt: "asc" }
    });

    if (stats.length === 0) {
        // Automatically create initial stats if none exist
        const initialStats = [
            { label: "Radiators Repaired", value: 125, icon: "radiator" },
            { label: "Senior Engineers", value: 210, icon: "engineer" },
            { label: "Gears Repaired", value: 455, icon: "gears" },
            { label: "Car Painted", value: 125, icon: "spray" },
        ];

        for (const s of initialStats) {
            await prisma.stats.create({ data: s as any });
        }

        stats = await prisma.stats.findMany({
            orderBy: { createdAt: "asc" }
        });
    }

    return (
        <div className="max-w-7xl mx-auto">
            <StatsClient stats={stats} />
        </div>
    );
}
