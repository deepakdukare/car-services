
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function update() {
    const features = [
        "Genuine Engine Oils: We use only certified and manufacturer-approved oils",
        "Latest Oil Change Equipment: Advanced tools for clean and efficient oil replacement",
        "Affordable & Transparent Pricing: No hidden charges, only expert service at fair prices",
        "Faster & Reliable Service: Improve engine life and performance instantly"
    ].join('\n');

    await prisma.productSection.upsert({
        where: { id: "oil" },
        update: {
            title: "Premium Engine Oil Change Services",
            highlight: "for Japanese, American, Korean & German Cars",
            features: features,
            cardTitle: "Engine Oil Service",
            cardDesc: "Protect your engine with our premium oil change service in Dubai. Book now!",
            phone: "+971555350887",
            ctaText: "Book Now",
            cardImage: "/images/oil-machine.png"
        },
        create: {
            id: "oil",
            title: "Premium Engine Oil Change Services",
            highlight: "for Japanese, American, Korean & German Cars",
            features: features,
            cardTitle: "Engine Oil Service",
            cardDesc: "Protect your engine with our premium oil change service in Dubai. Book now!",
            phone: "+971555350887",
            ctaText: "Book Now",
            cardImage: "/images/oil-machine.png"
        }
    });

    console.log("Oil product updated/created successfully");
    process.exit(0);
}

update();
