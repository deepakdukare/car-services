
import { PrismaClient } from "@prisma/client";
import { services } from "../data/services";
import { mainProducts } from "../data/products";
import { stats } from "../data/stats";
import { servicePackages } from "../data/servicePackages";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function getServiceType(name: string): "DIAGNOSTIC" | "PREVENTIVE" | "REPAIR" {
    const n = name.toLowerCase();
    if (n.includes("diagnostic") || n.includes("check") || n.includes("scan") || n.includes("inspection") || n.includes("checking")) return "DIAGNOSTIC";
    if (n.includes("maintenance") || n.includes("top-up") || n.includes("flush") || n.includes("cleaning") || n.includes("balancing") || n.includes("alignment") || n.includes("registration")) return "PREVENTIVE";
    return "REPAIR";
}

function getBasePrice(priceStr: string): number {
    if (!priceStr || priceStr.toLowerCase().includes("request")) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

function getDurationMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const n = timeStr.toLowerCase();
    if (n.includes("on inspection") || n === "-" || n.includes("request")) return 0;

    // Handle ranges like "30-45 mins" - take the upper bound
    const matches = n.match(/\d+/g);
    if (!matches) return 0;

    let val = parseInt(matches[matches.length - 1]);
    if (n.includes("hour")) val *= 60;
    if (n.includes("day")) val *= 1440;
    return val;
}

async function main() {
    console.log("Start seeding...");

    // 0. Seed Admin User
    console.log("Seeding Admin User...");
    const hashedPassword = await bcrypt.hash("admin@1234", 10);
    await prisma.user.upsert({
        where: { email: "admin@jadeandandy.com" },
        update: {},
        create: {
            email: "admin@jadeandandy.com",
            password: hashedPassword,
            name: "Admin User",
        },
    });

    // 1. Seed Service Categories (from services.ts)
    console.log("Seeding Service Categories...");
    for (const service of services) {
        const highlightsString = JSON.stringify(service.highlights);

        await prisma.serviceCategory.upsert({
            where: { id: service.id },
            update: {
                title: service.title,
                shortDescription: service.shortDescription,
                image: service.image,
                highlights: highlightsString,
                ctaText: service.ctaText,
            },
            create: {
                id: service.id,
                title: service.title,
                shortDescription: service.shortDescription,
                image: service.image,
                highlights: highlightsString,
                ctaText: service.ctaText,
            },
        });
    }

    // 2. Seed Product Sections (from products.ts)
    console.log("Seeding Product Sections...");
    const productKeys = Object.keys(mainProducts) as Array<keyof typeof mainProducts>;

    for (const key of productKeys) {
        const product = mainProducts[key];
        const featuresString = product.features.map((f: any) => `${f.title}: ${f.desc}`).join("\n");

        await prisma.productSection.upsert({
            where: { id: key },
            update: {
                title: product.title,
                highlight: product.highlight,
                features: featuresString,
                ctaText: product.ctaText,
                phone: product.phone,
                cardTitle: product.productCard.title,
                cardDesc: product.productCard.desc,
                cardImage: product.productCard.image,
            },
            create: {
                id: key,
                title: product.title,
                highlight: product.highlight,
                features: featuresString,
                ctaText: product.ctaText,
                phone: product.phone,
                cardTitle: product.productCard.title,
                cardDesc: product.productCard.desc,
                cardImage: product.productCard.image,
            }
        });
    }

    // 3. Seed Stats (from stats.ts)
    console.log("Seeding Stats...");
    // Clear existing using RAW command to avoid ID type mismatch issues (e.g. integer vs string)
    try {
        await (prisma as any).$runCommandRaw({
            delete: "Stats",
            deletes: [{ q: {}, limit: 0 }]
        });
        console.log("Cleared Stats collection using raw command.");
    } catch (e) {
        console.log("Warning: Could not clear stats using raw command. Continuing...", e);
    }

    for (const stat of stats) {
        await prisma.stats.create({
            data: {
                id: stat.id as string,
                label: stat.label,
                value: stat.value,
                icon: stat.icon,
            },
        });
    }

    // 4. Seed Service Packages
    console.log("Seeding Service Packages...");
    for (const pkg of servicePackages) {
        const featuresString = JSON.stringify(pkg.features);

        await prisma.servicePackage.upsert({
            where: { id: pkg.id },
            update: {
                title: pkg.title,
                price: pkg.price,
                highlighted: pkg.highlighted,
                features: featuresString,
            },
            create: {
                id: pkg.id,
                title: pkg.title,
                price: pkg.price,
                highlighted: pkg.highlighted,
                features: featuresString,
            },
        });
    }

    // 5. Seed Testimonials
    console.log("Seeding Testimonials...");
    // 5. Seed Testimonials
    console.log("Seeding Testimonials...");
    const testimonials = [
        {
            name: "Ahmed Al-Farsi",
            role: "Business Owner · Downtown Dubai",
            image: "/testimonials/user1.jpg",
            review: "Professional service with clear communication. The team handled my vehicle with great care and delivered exactly as promised.",
        },
        {
            name: "Michael Turner",
            role: "Luxury Car Owner · Dubai Marina",
            image: "/testimonials/user2.jpg",
            review: "One of the few workshops in Dubai I genuinely trust. Transparent pricing and excellent workmanship.",
        },
        {
            name: "Sarah Williams",
            role: "Fleet Manager · JLT",
            image: "/testimonials/user3.jpg",
            review: "We service multiple vehicles here. Consistent quality, timely delivery, and professional reporting every time.",
        },
        {
            name: "Omar Khan",
            role: "SUV Owner · Al Barsha",
            image: "/testimonials/user4.jpg",
            review: "Very organized setup and knowledgeable staff. They explained the work clearly before starting.",
        },
        {
            name: "Jhon Parker",
            role: "Loyal Customer For 2 Years",
            image: "/about/pic11.jpg",
            review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
        },
        {
            name: "Anna Smith",
            role: "Loyal Customer For 3 Years",
            image: "/about/pic12.jpg",
            review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
        },
        {
            name: "Anna Smith",
            role: "Loyal Customer For 3 Years",
            image: "/about/pic13.jpg",
            review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
        },
        {
            name: "Anna Smith",
            role: "Loyal Customer For 3 Years",
            image: "/about/pic14.jpg",
            review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
        },
    ];

    for (const t of testimonials) {
        await prisma.testimonial.create({
            data: t
        });
    }

    // 6. Seed Team Members
    console.log("Seeding Team Members...");
    const teamMembers = [
        {
            name: "Richard Wagner",
            role: "Technician",
            image: "/about/team1.jpg",
            socials: { facebook: "#", twitter: "#", instagram: "#" },
        },
        {
            name: "James Strasser",
            role: "Technician",
            image: "/about/team2.jpg",
            socials: { facebook: "#", twitter: "#", instagram: "#" },
        },
        {
            name: "Simpson Martin",
            role: "Technician",
            image: "/about/team3.jpg",
            socials: { facebook: "#", twitter: "#", instagram: "#" },
        },
        {
            name: "Simpson Martin",
            role: "Technician",
            image: "/about/team4.jpg",
            socials: { facebook: "#", twitter: "#", instagram: "#" },
        },
    ];

    for (const member of teamMembers) {
        await prisma.teamMember.create({
            data: {
                ...member,
                socials: JSON.stringify(member.socials)
            }
        });
    }

    // 7. Seed AC Services
    console.log("Seeding AC Services...");
    const acServices = [
        {
            name: "Complete AC System Diagnostic",
            description: "Full AC system inspection to identify cooling and performance issues.",
            price: "From 150 AED",
            time: "From 1 hour",
            image: "/services/ac/ac1.png",
        },
        {
            name: "AC Compressor & Electrical Check",
            description: "Inspection of AC compressor, wiring, fuses, and clutch operation.",
            price: "From 250 AED",
            time: "From 1–2 hours",
            image: "/services/ac/ac2.png",
        },
        {
            name: "AC Repair Services",
            description: "Complete AC repair to restore optimal cooling performance.",
            price: "From 300 AED",
            time: "On inspection",
            image: "/services/ac/ac4.png"
        },
        {
            name: "Car AC Filter Replacement",
            description: "Replacement of cabin AC filter to improve airflow and air quality.",
            price: "From 100 AED",
            time: "30 minutes",
            image: "/services/ac/ac3.png",
        },
        {
            name: "AC Leak Detection & Gas Leak Repair",
            description: "Detection and repair of AC refrigerant leaks.",
            price: "From 250 AED",
            time: "From 1 hour",
            image: "/services/ac/ac5.png",
        },
        {
            name: "Car AC Gas Refill Service",
            description: "Inspection and refilling of AC gas for efficient cooling.",
            price: "From 150 AED",
            time: "From 1 hour",
            image: "/services/ac/ac6.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "air-conditioning" }
    });

    for (const item of acServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "air-conditioning",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 8. Seed Brake Services
    console.log("Seeding Brake Services...");
    const brakeServices = [
        {
            name: "Brake system diagnosis",
            description: "Complete brake system inspection using advanced diagnostics to detect safety and performance issues early.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/brake/diagnostics.jpg",
        },
        {
            name: "Brake pad replacement",
            description: "Replacement of worn brake pads to restore strong stopping power and prevent brake rotor damage.",
            price: "from 150 AED",
            time: "from 1 hour",
            image: "/services/brake/pads.png",
        },
        {
            name: "Brake disk replacement",
            description: "Professional brake disc replacement to ensure smooth braking, reduced vibration, and maximum safety.",
            price: "from 150 AED",
            time: "from 1 hour",
            image: "/services/brake/disk.png",
        },
        {
            name: "Brake fluid replacement",
            description: "Old brake fluid is flushed and replaced to maintain proper hydraulic pressure and braking response.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/brake/fluid.png",
        },
        {
            name: "Brake caliper replacement",
            description: "Brake caliper repair or replacement to fix uneven braking, noise issues, and brake dragging.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/brake/caliper.png",
        },
        {
            name: "Brake light replacement",
            description: "Replacement of faulty brake lights to ensure road safety and compliance with traffic regulations.",
            price: "from 100 AED",
            time: "-",
            image: "/services/brake/bulb.png",
        },
        {
            name: "Brake light bulb replacement",
            description: "Quick brake light bulb replacement to improve visibility and enhance driving safety.",
            price: "from 50 AED",
            time: "-",
            image: "/services/brake/light.png",
        },
        {
            name: "Hand brake repair",
            description: "Hand brake repair and adjustment to ensure secure parking and reliable emergency braking.",
            price: "from 100 AED",
            time: "-",
            image: "/services/brake/handbrake.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "brake-system" }
    });

    for (const item of brakeServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "brake-system",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 9. Seed Cooling Services
    console.log("Seeding Cooling Services...");
    const coolingServices = [
        {
            name: "Car cooling system repair",
            description: "Complete repair of the car cooling system to prevent overheating and engine damage.",
            price: "from 150 AED",
            time: "-",
            image: "/services/cooling/system-repair.png",
        },
        {
            name: "Car radiator cleaning",
            description: "Professional radiator cleaning to remove deposits and improve cooling efficiency.",
            price: "from 200 AED",
            time: "-",
            image: "/services/cooling/radiator-cleaning.png",
        },
        {
            name: "Coolant leak repair",
            description: "Detection and repair of coolant leaks to maintain proper engine temperature.",
            price: "from 100 AED",
            time: "-",
            image: "/services/cooling/coolant-leak.png",
        },
        {
            name: "Radiator repair",
            description: "Repair of damaged radiator to restore effective heat dissipation and cooling performance.",
            price: "from 300 AED",
            time: "-",
            image: "/services/cooling/radiator-repair.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "cooling-system" }
    });

    for (const item of coolingServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "cooling-system",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 10. Seed Suspension & Steering Services
    console.log("Seeding Suspension & Steering Services...");
    const suspensionSteeringServices = [
        // Steering Services
        {
            name: "Car power steering repair",
            description: "Complete repair of the power steering system to restore smooth and precise steering.",
            price: "from 200 AED",
            time: "-",
            image: "/services/steering/system-repair2.png",
        },
        {
            name: "Power steering repair with amplifier",
            description: "Power steering repair with amplifier for enhanced steering assistance and control.",
            price: "from 250 AED (Price on request)",
            time: "-",
            image: "/services/steering/with-amplifier.png",
        },
        {
            name: "Power steering repair without amplifier",
            description: "Repair of power steering system without amplifier for reliable steering performance.",
            price: "from 150 AED (Price on request)",
            time: "-",
            image: "/services/steering/without-amplifier.png",
        },
        {
            name: "Electric power steering repair",
            description: "Repair of electric power steering system to fix warning lights and steering issues.",
            price: "from 150 AED",
            time: "-",
            image: "/services/steering/electric.png",
        },
        {
            name: "Power steering line repair",
            description: "Repair of power steering lines to prevent fluid leaks and pressure loss.",
            price: "from 100 AED",
            time: "-",
            image: "/services/steering/line-repair.png",
        },
        {
            name: "Steering wheel leather repair",
            description: "Repair and restoration of steering wheel leather for improved comfort and appearance.",
            price: "Price on request",
            time: "-",
            image: "/services/steering/wheel-leather.png",
        },
        {
            name: "Power steering oil change",
            description: "Replacement of power steering oil to maintain smooth steering operation.",
            price: "from 150 AED",
            time: "-",
            image: "/services/steering/oil-change.png",
        },
        {
            name: "Power steering belt replacement",
            description: "Replacement of worn power steering belt to ensure proper system operation.",
            price: "from 150 AED",
            time: "-",
            image: "/services/steering/belt.png",
        },
        {
            name: "Power steering fluid replacement",
            description: "Flushing and replacement of power steering fluid to improve steering response.",
            price: "from 100 AED",
            time: "-",
            image: "/services/steering/fluid2.png",
        },
        // Suspension Services
        {
            name: "Spring replacement",
            description: "Replacement of worn or broken suspension springs to restore ride height and driving comfort.",
            price: "from 150 AED",
            time: "from 1 hour",
            image: "/services/suspension/spring.png",
        },
        {
            name: "Silent block replacement (per piece)",
            description: "Replacement of damaged silent blocks to reduce vibration and improve suspension stability.",
            price: "from 100 AED",
            time: "from 2 hours",
            image: "/services/suspension/silent-block1.png",
        },
        {
            name: "Shock absorber replacement",
            description: "Replacement of shock absorbers to improve vehicle handling, comfort, and road grip.",
            price: "from 200 AED",
            time: "from 2 hours",
            image: "/services/suspension/shock-absorber.png",
        },
        {
            name: "Upper arm replacement (2 pcs)",
            description: "Replacement of upper suspension arms to restore proper wheel alignment and control.",
            price: "from 150 AED",
            time: "from 2 hours",
            image: "/services/suspension/upper-arm.png",
        },
        {
            name: "Lower arm replacement (2 pcs)",
            description: "Replacement of lower control arms to improve suspension strength and steering accuracy.",
            price: "from 150 AED",
            time: "from 2 hours",
            image: "/services/suspension/lower-arm.png",
        },
        {
            name: "Guide arm replacement (2 pcs)",
            description: "Replacement of guide arms to maintain correct wheel positioning and suspension balance.",
            price: "from 150 AED",
            time: "from 2 hours",
            image: "/services/suspension/guide-arm.png",
        },
        {
            name: "Cross arm replacement (2 pcs)",
            description: "Replacement of cross arms to ensure proper suspension geometry and safe handling.",
            price: "from 150 AED",
            time: "from 2 hours",
            image: "/services/suspension/cross-arm.png",
        },
        {
            name: "Stabilizer struts replacement (2 pcs)",
            description: "Replacement of stabilizer links to reduce body roll and improve cornering stability.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/suspension/stabilizer.png",
        },
        {
            name: "Steering rod replacement (2 pcs)",
            description: "Replacement of steering rods to ensure precise steering control and vehicle safety.",
            price: "from 150 AED",
            time: "from 2 hours",
            image: "/services/suspension/steering-rod.png",
        },
        {
            name: "Car shock absorber replacement",
            description: "Professional replacement of car shock absorbers to enhance ride comfort and stability.",
            price: "from 150 AED",
            time: "-",
            image: "/services/suspension/car-shock.png",
        },
        {
            name: "Coil springs replacement",
            description: "Replacement of coil springs to restore suspension performance and vehicle balance.",
            price: "from 200 AED",
            time: "-",
            image: "/services/suspension/coil-spring.png",
        },
        {
            name: "Wheel balancing",
            description: "Wheel balancing to eliminate vibrations and ensure smooth driving at all speeds.",
            price: "from 100 AED",
            time: "15–30 minutes",
            image: "/services/suspension/balancing.png",
        },
        {
            name: "Wheel repair and painting",
            description: "Repair and repainting of damaged wheels to restore appearance and durability.",
            price: "from 200 AED",
            time: "from 1 hour",
            image: "/services/suspension/wheel-repair.png",
        },
        {
            name: "Suspension checking",
            description: "Complete suspension inspection to identify wear, damage, or alignment issues.",
            price: "from 100 AED",
            time: "15–30 minutes",
            image: "/services/suspension/checking.png",
        },
        {
            name: "Single axis wheel alignment",
            description: "Single axis alignment adjustment to improve steering accuracy and tire life.",
            price: "from 100 AED",
            time: "30–60 minutes",
            image: "/services/suspension/single-axis.png",
        },
        {
            name: "Two axis wheel alignment",
            description: "Two axis wheel alignment to ensure perfect wheel positioning and stable handling.",
            price: "from 200 AED",
            time: "30–60 minutes",
            image: "/services/suspension/two-axis.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "suspension-steering" }
    });

    for (const item of suspensionSteeringServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "suspension-steering",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 11. Seed Electrical Services
    console.log("Seeding Electrical Services...");
    const electricalServices = [
        {
            name: "Electrical diagnostics",
            description: "Comprehensive electrical system diagnostics to identify faults and performance issues.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/electric/diagnostics.png",
        },
        {
            name: "FRM unit repair",
            description: "Repair of FRM module to restore proper lighting, windows, and electrical functions.",
            price: "from 450 AED",
            time: "from 2 hours",
            image: "/services/electric/frm.png",
        },
        {
            name: "ABS sensor replacement",
            description: "Replacement of faulty ABS sensor to ensure proper braking and stability control.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/electric/abs-sensor.png",
        },
        {
            name: "Instrument cluster replacement",
            description: "Replacement of instrument panel to restore accurate vehicle information display.",
            price: "from 500 AED",
            time: "from 3 hours",
            image: "/services/electric/instrument-cluster.png",
        },
        {
            name: "Alternator diode bridge replacement",
            description: "Replacement of alternator diode bridge to fix charging and electrical issues.",
            price: "from 100 AED",
            time: "2–4 hours",
            image: "/services/electric/alternator-diode.png",
        },
        {
            name: "Alternator brush assembly replacement",
            description: "Replacement of alternator brushes to restore stable battery charging.",
            price: "from 80 AED",
            time: "1–2 hours",
            image: "/services/electric/alternator-brush.png",
        },
        {
            name: "Generator replacement",
            description: "Replacement of faulty generator to ensure proper electrical power supply.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/electric/generator.png",
        },
        {
            name: "Check engine light diagnostics",
            description: "Diagnostic scan to identify the cause of the check engine warning light.",
            price: "from 50 AED",
            time: "-",
            image: "/services/electric/check-engine.png",
        },
        {
            name: "Fuse repair",
            description: "Repair or replacement of damaged fuses to restore electrical circuits.",
            price: "from 50 AED",
            time: "-",
            image: "/services/electric/fuse.png",
        },
        {
            name: "Car window switch repair",
            description: "Repair of window switches to restore smooth window operation.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/window-switch.png",
        },
        {
            name: "Battery replacement",
            description: "Replacement of car battery to ensure reliable engine start and power supply.",
            price: "from 50 AED",
            time: "-",
            image: "/services/electric/battery.png",
        },
        {
            name: "Battery registration & info entry",
            description: "Battery registration and coding to ensure compatibility with vehicle systems.",
            price: "from 50 AED",
            time: "-",
            image: "/services/electric/battery-registration.png",
        },
        {
            name: "Ignition repair",
            description: "Repair of ignition system to resolve starting and power issues.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/ignition.png",
        },
        {
            name: "Back light repair",
            description: "Repair of rear lights to maintain visibility and road safety.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/back-light.png",
        },
        {
            name: "Trunk lock repair",
            description: "Repair of trunk locking mechanism to restore secure access.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/trunk-lock-repair.png",
        },
        {
            name: "Trunk lock replacement",
            description: "Replacement of trunk lock for improved security and functionality.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/trunk-lock.png",
        },
        {
            name: "Electric seat repair",
            description: "Repair of electric seat mechanisms for smooth and reliable adjustment.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/seat-repair.png",
        },
        {
            name: "Seat wiring repair",
            description: "Repair of seat wiring to fix electrical seat movement and controls.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/seat-wiring.png",
        },
        {
            name: "Seat replacement",
            description: "Replacement of car seat to restore comfort and functionality.",
            price: "from 150 AED",
            time: "-",
            image: "/services/electric/seat.png",
        },
        {
            name: "Battery cable replacement",
            description: "Replacement of damaged battery cables to ensure proper power flow.",
            price: "from 100 AED",
            time: "-",
            image: "/services/electric/battery-cable.png",
        },
        {
            name: "Starter repair",
            description: "Repair of starter motor to resolve engine starting issues.",
            price: "from 200 AED",
            time: "-",
            image: "/services/electric/starter.png",
        },
        {
            name: "Central locking repair",
            description: "Diagnosis and repair of central locking system for secure door operation.",
            price: "from 150 AED",
            time: "-",
            image: "/services/electric/central-lock.png",
        },
        {
            name: "Alternator repair",
            description: "Complete alternator repair to restore efficient battery charging.",
            price: "from 250 AED",
            time: "-",
            image: "/services/electric/alternator.png",
        },
        {
            name: "Immobilizer repair",
            description: "Repair of immobilizer system to resolve key recognition issues.",
            price: "from 150 AED",
            time: "-",
            image: "/services/electric/immobilizer.png",
        },
        {
            name: "Car computer programming",
            description: "Vehicle computer programming for system configuration and coding.",
            price: "from 150 AED",
            time: "-",
            image: "/services/electric/programming.png",
        },
        {
            name: "Navigation system update",
            description: "Update of car navigation software for accurate maps and routing.",
            price: "from 200 AED",
            time: "-",
            image: "/services/electric/navigation.png",
        },
        {
            name: "Car software update",
            description: "Software update to improve vehicle performance and fix system bugs.",
            price: "from 200 AED",
            time: "-",
            image: "/services/electric/software-update.png",
        },
        {
            name: "Car scan service",
            description: "Full system scan to detect error codes and electronic faults.",
            price: "from 50 AED",
            time: "-",
            image: "/services/electric/scan.png",
        },
        {
            name: "ECU repair",
            description: "Diagnosis and repair of engine control unit for optimal engine performance.",
            price: "from 200 AED",
            time: "-",
            image: "/services/electric/ecu.png",
        },
        {
            name: "Car sensor repair",
            description: "Repair or replacement of faulty sensors to restore correct vehicle readings.",
            price: "from 150 AED",
            time: "-",
            image: "/services/electric/sensor.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "electrical-system" }
    });

    for (const item of electricalServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "electrical-system",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 12. Seed Engine Services
    console.log("Seeding Engine Services...");
    const engineServices = [
        {
            name: "Engine overhaul",
            description: "Complete engine rebuild to restore original performance and reliability.",
            price: "On request",
            time: "3–28 days",
            image: "/services/engine/engine-overhaul.png",
        },
        {
            name: "Replacement of engine attachments (alternator, starter)",
            description: "Replacement of alternator, starter motor, and related engine attachments.",
            price: "From 150 AED",
            time: "From 1 hour",
            image: "/services/engine/engine-attachments.png",
        },
        {
            name: "Engine diagnostics (endoscopy and locking)",
            description: "Advanced engine diagnostics using endoscopy and locking tools.",
            price: "From 500 AED",
            time: "From 2 hours",
            image: "/services/engine/engine-diagnostics.png",
        },
        {
            name: "Replacing the oil sealing caps (ISC)",
            description: "Replacement of oil sealing caps to prevent oil leaks and consumption.",
            price: "From 500 AED",
            time: "2–5 hours",
            image: "/services/engine/oil-sealing-caps.png",
        },
        {
            name: "Timing belt drive replacement",
            description: "Replacement of timing belt drive to maintain proper engine timing.",
            price: "From 350 AED",
            time: "From 2 hours",
            image: "/services/engine/timing-belt-drive.png",
        },
        {
            name: "Repair of the cylinder-head unit",
            description: "Repair of cylinder head unit to restore compression and performance.",
            price: "From 350 AED",
            time: "1–11 hours",
            image: "/services/engine/cylinder-head-unit2.png",
        },
        {
            name: "Inlet manifold flushing",
            description: "Cleaning of inlet manifold to remove carbon buildup.",
            price: "From 300 AED",
            time: "From 1 hour",
            image: "/services/engine/inlet-manifold.png",
        },
        {
            name: "Valve cover gasket replacement",
            description: "Replacement of valve cover gasket to stop oil leakage.",
            price: "From 150 AED",
            time: "1–7 hours",
            image: "/services/engine/valve-cover-gasket.png",
        },
        {
            name: "Ignition coil replacement",
            description: "Replacement of faulty ignition coils for smooth engine ignition.",
            price: "From 100 AED",
            time: "From 1 hour",
            image: "/services/engine/ignition-coil.png",
        },
        {
            name: "Injector flushing on diesel and gasoline engines",
            description: "Injector cleaning for diesel and petrol engines to improve fuel efficiency.",
            price: "From 300 AED",
            time: "From 1 hour",
            image: "/services/engine/injector-flushing.png",
        },
        {
            name: "Spark plug replacement",
            description: "Replacement of spark plugs to ensure proper ignition.",
            price: "From 100 AED",
            time: "From 1 hour",
            image: "/services/engine/spark-plug.png",
        },
        {
            name: "Replacing drive belts",
            description: "Replacement of engine drive belts for reliable accessory operation.",
            price: "From 200 AED",
            time: "From 1 hour",
            image: "/services/engine/drive-belts.png",
        },
        {
            name: "Tensioner roller replacement (when replacing belts)",
            description: "Replacement of tensioner roller to maintain belt tension.",
            price: "From 300 AED",
            time: "From 1 hour",
            image: "/services/engine/tensioner-roller.png",
        },
        {
            name: "Flushing the cooling radiator",
            description: "Radiator flushing to remove deposits and improve cooling efficiency.",
            price: "From 300 AED",
            time: "From 1 hour",
            image: "/services/engine/radiator-flush.png",
        },
        {
            name: "Gasoline pump replacement",
            description: "Replacement of gasoline fuel pump for proper fuel delivery.",
            price: "From 300 AED",
            time: "From 1 hour",
            image: "/services/engine/fuel-pump.png",
        },
        {
            name: "Car Check engine light diagnostics",
            description: "Diagnostic scan to identify check engine warning issues.",
            price: "From 50 AED",
            time: "30 minutes",
            image: "/services/engine/check-engine.png",
        },
        {
            name: "Cylinder head repair",
            description: "Repair of cylinder head to restore compression and sealing.",
            price: "From 500 AED",
            time: "On inspection",
            image: "/services/engine/cylinder-head.png",
        },
        {
            name: "Camshaft replacement",
            description: "Replacement of camshaft to restore proper valve timing.",
            price: "From 200 AED",
            time: "On inspection",
            image: "/services/engine/camshaft.png",
        },
        {
            name: "Engine flush",
            description: "Internal engine cleaning to remove sludge and deposits.",
            price: "From 100 AED",
            time: "From 1 hour",
            image: "/services/engine/engine-flush.png",
        },
        {
            name: "Oil pump repair",
            description: "Repair or replacement of engine oil pump to maintain oil pressure.",
            price: "From 500 AED",
            time: "On inspection",
            image: "/services/engine/oil-pump.png",
        },
        {
            name: "Crankshaft replacement",
            description: "Replacement of crankshaft for smooth engine rotation.",
            price: "From 1000 AED",
            time: "On inspection",
            image: "/services/engine/crankshaft.png",
        },
        {
            name: "Water Pump Replacement",
            description: "Replacement of water pump to maintain proper engine cooling.",
            price: "From 150 AED",
            time: "From 1 hour",
            image: "/services/engine/water-pump.png",
        },
        {
            name: "Car Overheating repair",
            description: "Diagnosis and repair of engine overheating issues.",
            price: "From 150 AED",
            time: "On inspection",
            image: "/services/engine/overheating.png",
        },
        {
            name: "Head gasket repair",
            description: "Repair of head gasket to prevent oil and coolant mixing.",
            price: "From 500 AED",
            time: "On inspection",
            image: "/services/engine/head-gasket.png",
        },
        {
            name: "Engine oil leak repair",
            description: "Repair of oil leaks to protect engine components.",
            price: "From 300 AED",
            time: "On inspection",
            image: "/services/engine/oil-leak.png",
        },
        {
            name: "Timing Belt Replacement",
            description: "Replacement of timing belt to avoid serious engine damage.",
            price: "From 100 AED",
            time: "From 1 hour",
            image: "/services/engine/timing-belt.png",
        },
        {
            name: "Spark plug change",
            description: "Spark plug change for smooth ignition and fuel efficiency.",
            price: "From 100 AED",
            time: "From 1 hour",
            image: "/services/engine/spark-plug-change.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "engine-services" }
    });

    for (const item of engineServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "engine-services",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 13. Seed Exhaust Services
    console.log("Seeding Exhaust Services...");
    const exhaustServices = [
        {
            name: "Exhaust Leak Repair",
            description: "Repair of exhaust leaks to prevent fumes and restore system efficiency.",
            price: "From 200 AED",
            time: "From 1 hour",
            image: "/services/exhaust/ex1.png",
        },
        {
            name: "Muffler Replacement",
            description: "Replacement of damaged muffler to reduce noise and improve exhaust flow.",
            price: "From 300 AED",
            time: "From 1–2 hours",
            image: "/services/exhaust/ex2.png",
        },
        {
            name: "Catalytic Converter Repair / Replacement",
            description: "Repair or replacement of catalytic converter to control emissions.",
            price: "From 800 AED",
            time: "On inspection",
            image: "/services/exhaust/ex3.png",
        },
        {
            name: "Exhaust Pipe Replacement",
            description: "Replacement of damaged or corroded exhaust pipes.",
            price: "From 250 AED",
            time: "From 1–2 hours",
            image: "/services/exhaust/ex4.png",
        },
        {
            name: "Oxygen Sensor Replacement",
            description: "Replacement of faulty oxygen sensor for optimal engine performance.",
            price: "From 200 AED",
            time: "From 1 hour",
            image: "/services/exhaust/ex5.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "exhaust-emission" }
    });

    for (const item of exhaustServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "exhaust-emission",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 14. Seed General Maintenance Services (Oil & Fluid)
    console.log("Seeding General Maintenance Services...");
    const generalServices = [
        {
            name: "Engine oil and filter change",
            description: "Replacement of engine oil and filters to keep the engine clean and running smoothly.",
            price: "from 200 AED",
            time: "from 1 hour",
            image: "/services/oil/engine-oil-filter.png",
        },
        {
            name: "Gearbox oil replacement",
            description: "Changing gearbox oil to ensure smooth gear shifting and reduced internal wear.",
            price: "from 450 AED",
            time: "from 1 hour",
            image: "/services/oil/gearbox-oil2.png",
        },
        {
            name: "Transfer case oil change",
            description: "Replacement of transfer case oil to maintain proper drivetrain performance.",
            price: "from 300 AED",
            time: "from 1 hour",
            image: "/services/oil/transfer-case2.png",
        },
        {
            name: "Reducer oil change",
            description: "Changing reducer oil to improve lubrication and extend component lifespan.",
            price: "from 300 AED",
            time: "from 1 hour",
            image: "/services/oil/reducer.png",
        },
        {
            name: "Car oil and filter change",
            description: "Quick oil and filter change service to maintain engine efficiency and protection.",
            price: "from 150 AED",
            time: "-",
            image: "/services/oil/car-oil-change.png",
        },
        {
            name: "Gearbox oil change",
            description: "Gearbox oil replacement to reduce friction and improve transmission performance.",
            price: "from 350 AED",
            time: "-",
            image: "/services/oil/gearbox-change.png",
        },
        {
            name: "Power steering oil change",
            description: "Replacement of power steering oil to ensure smooth and responsive steering.",
            price: "from 150 AED",
            time: "-",
            image: "/services/oil/power-steering.png",
        },
        {
            name: "Engine oil leak repair",
            description: "Diagnosis and repair of engine oil leaks to prevent damage and oil loss.",
            price: "from 300 AED",
            time: "-",
            image: "/services/oil/oil-leak2.png",
        },
    ];

    // Clear existing to avoid duplicates
    await prisma.serviceItem.deleteMany({
        where: { categoryId: "general-maintenance" }
    });

    for (const item of generalServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "general-maintenance",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 15. Seed Transmission Services
    console.log("Seeding Transmission Services...");
    const transmissionServices = [
        {
            name: "Transmission oil replacement",
            description: "Replacement of transmission oil to ensure smooth gear shifting and extended gearbox life.",
            price: "from 300 AED",
            time: "-",
            image: "/services/transmission/oil-replacement.png",
        },
        {
            name: "Seal replacement",
            description: "Replacement of worn transmission seals to prevent oil leakage and system damage.",
            price: "from 200 AED",
            time: "-",
            image: "/services/transmission/seal.png",
        },
        {
            name: "Automatic transmission adaptation",
            description: "Transmission adaptation and calibration for smooth automatic gear shifting.",
            price: "from 250 AED",
            time: "-",
            image: "/services/transmission/adaptation.png",
        },
        {
            name: "Differential oil change",
            description: "Replacement of differential oil to reduce wear and ensure quiet operation.",
            price: "from 150 AED",
            time: "-",
            image: "/services/transmission/differential-oil.png",
        },
        {
            name: "Transfer case replacement",
            description: "Replacement of transfer case to restore proper power distribution to the wheels.",
            price: "from 250 AED",
            time: "-",
            image: "/services/transmission/transfer-case.png",
        },
        {
            name: "Gearbox replacement",
            description: "Complete gearbox replacement to restore full transmission functionality.",
            price: "from 300 AED",
            time: "-",
            image: "/services/transmission/gearbox.png",
        },
        {
            name: "Gearbox programming & gear adjustment",
            description: "Programming and adjustment of gearbox for accurate shifting and performance.",
            price: "from 300 AED",
            time: "-",
            image: "/services/transmission/programming2.png",
        },
        {
            name: "Gearbox oil change",
            description: "Gearbox oil replacement to improve lubrication and reduce internal wear.",
            price: "from 350 AED",
            time: "-",
            image: "/services/transmission/gearbox-oil.png",
        },
        {
            name: "Axle repair",
            description: "Repair of axle components to restore drivetrain stability and power transfer.",
            price: "from 200 AED",
            time: "-",
            image: "/services/transmission/axle.png",
        },
        {
            name: "Clutch replacement",
            description: "Complete clutch replacement to ensure smooth engagement and reliable power delivery.",
            price: "from 900 AED",
            time: "-",
            image: "/services/transmission/clutch.png",
        },
    ];

    await prisma.serviceItem.deleteMany({
        where: { categoryId: "transmission-services" }
    });

    for (const item of transmissionServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "transmission-services",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    // 16. Seed Tyre Services
    console.log("Seeding Tyre Services...");
    const tireServices = [
        {
            name: "Tire service",
            description: "Professional tire removal, installation, and inspection for safe driving.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/tires/tire-service.png",
        },
        {
            name: "RunFlat tire service",
            description: "Specialized service for RunFlat tires to ensure proper handling and safety.",
            price: "from 100 AED",
            time: "from 1 hour",
            image: "/services/tires/runflat.png",
        },
        {
            name: "Tire rubber repair",
            description: "Quick rubber puncture repair to restore tire integrity and prevent air loss.",
            price: "from 100 AED",
            time: "15 minutes",
            image: "/services/tires/rubber-repair.png",
        },
    ];

    await prisma.serviceItem.deleteMany({
        where: { categoryId: "tyres-wheels" }
    });

    for (const item of tireServices) {
        await prisma.serviceItem.create({
            data: {
                ...item,
                categoryId: "tyres-wheels",
                basePrice: getBasePrice(item.price),
                durationMinutes: getDurationMinutes(item.time),
                serviceType: getServiceType(item.name),
                status: "ACTIVE"
            }
        });
    }

    console.log("Seeding completed.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
