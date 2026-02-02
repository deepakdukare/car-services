import { prisma } from "@/lib/prisma";
import ServicePackagesClient from "./ServicePackagesClient";

export default async function ServicePackagesPage() {
    let packages = await prisma.servicePackage.findMany({
        orderBy: { createdAt: "desc" }
    });

    // If no packages exist yet, let's provide the default ones as a starting point
    if (packages.length === 0) {
        // This is just for demonstration, in production you'd seed these
        packages = [
            {
                id: "minor",
                title: "Minor Service",
                price: "189 AED + VAT",
                highlighted: false,
                features: JSON.stringify([
                    { label: "Oil with filter replacement", included: true },
                    { label: "Cleaning air filter & AC filter", included: true },
                    { label: "Coolant, brake fluid", included: true },
                    { label: "Power steering fluid top-up", included: true },
                    { label: "AC gas top-up", included: true },
                    { label: "Full inspection", included: true },
                    { label: "Reset maintenance service", included: true },
                    { label: "Vacuum cleaning", included: true },
                    { label: "Free car wash", included: true },
                ])
            },
            {
                id: "full",
                title: "Full Service",
                price: "489 AED + VAT",
                highlighted: true,
                features: JSON.stringify([
                    { label: "Oil change", included: true },
                    { label: "Oil filter replacement", included: true },
                    { label: "Air & AC filter replacement", included: true },
                    { label: "Spark plugs replacement", included: true },
                    { label: "Coolant, brake fluid", included: true },
                    { label: "Power steering fluid top-up", included: true },
                    { label: "AC gas top-up", included: true },
                    { label: "Full inspection", included: true },
                    { label: "Reset maintenance service", included: true },
                    { label: "Vacuum cleaning", included: true },
                    { label: "Free car wash", included: true },
                    { label: "Free pick & drop (Dubai)", included: true },
                    { label: "Air filter", included: false },
                    { label: "AC filter", included: false },
                ])
            },
            {
                id: "major",
                title: "Major Service",
                price: "1899 AED + VAT",
                highlighted: false,
                features: JSON.stringify([
                    { label: "Oil Change", included: true },
                    { label: "Oil & filter replacement", included: true },
                    { label: "Engine flushing", included: true },
                    { label: "Air filter and ac filter replacement", included: true },
                    { label: "Spark plugs replacement", included: true },
                    { label: "Coolant & brake fluid", included: true },
                    { label: "Power steering fluid", included: true },
                    { label: "AC gas top-up", included: true },
                    { label: "ATF oil , ATF filter & ATF gasket replacement", included: true },
                    { label: "Differential oil replacement", included: true },
                    { label: "Engine drive belt replacement", included: true },
                    { label: "Full inspection", included: true },
                    { label: "Reset maintance Service", included: true },
                    { label: "Vacuum cleaning", included: true },
                    { label: "Free car wash", included: true },
                    { label: "Free pick & drop (Dubai)", included: true },
                ])
            },
            {
                id: "contract",
                title: "Service Contract",
                price: "1699 AED + VAT",
                highlighted: false,
                features: JSON.stringify([
                    { label: "Service contract (Basic)", included: true },
                    { label: "Service contract (Plus)", included: true },
                    { label: "2 Years / 60,000 KM coverage", included: true }
                ])
            }
        ] as any[];
    }

    return (
        <div className="max-w-7xl mx-auto">
            <ServicePackagesClient packages={packages} />
        </div>
    );
}
