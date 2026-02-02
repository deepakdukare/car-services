const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env' }); // Load env vars

const prisma = new PrismaClient();

// Map of service names to images from your data files
const serviceImages = {
    "Engine oil leak repair": "/services/brake/diagnostics.jpg",
    "Power steering oil change": "/services/brake/pads.jpg",
    "Gearbox oil change": "/services/brake/discs.jpg",

    // Data from brakeServices.ts
    "Brake System Diagnostics": "/services/brake/diagnostics.jpg",
    "Brake Pad Replacement": "/services/brake/pads.jpg",
    "Brake Disc Refacing": "/services/brake/discs.jpg",
    "ABS System Repair": "/services/brake/abs.jpg",
    "Brake Fluid Flush": "/services/brake/fluid.jpg",
    "Master Cylinder Repair": "/services/brake/master.jpg",
    "Handbrake Adjustment": "/services/brake/handbrake.jpg",
    "Caliper Service": "/services/brake/caliper.jpg",

    // Data from acServices.ts
    "AC Gas Refill": "/services/ac/gas-refill.jpg",
    "AC Compressor Repair": "/services/ac/compressor.jpg",
    "AC Leak Detection": "/services/ac/leak.jpg",
    "AC Filter Replacement": "/services/ac/filter.jpg",
    "AC System Cleaning": "/services/ac/cleaning.jpg",
    "Evaporator Cleaning": "/services/ac/evaporator.jpg",

    // Data from oilServices.ts
    "Engine Oil Change": "/services/oil/change.jpg",
    "Oil Filter Replacement": "/services/oil/filter.jpg",
    "Full System Flush": "/services/oil/flush.jpg",

    // Data from suspensionServices.ts
    "Shock Absorber Replacement": "/services/suspension/shocks.jpg",
    "Strut Replacement": "/services/suspension/struts.jpg",
    "Wheel Alignment": "/services/suspension/alignment.jpg",
    "Control Arm Replacement": "/services/suspension/control-arm.jpg",
    "Ball Joint Replacement": "/services/suspension/ball-joint.jpg",
    "Sway Bar Link Replacement": "/services/suspension/sway-bar.jpg"
};

async function main() {
    console.log('Start updating service images...');

    try {
        const services = await prisma.serviceItem.findMany();
        console.log(`Found ${services.length} services.`);

        for (const service of services) {
            if (serviceImages[service.name]) {
                await prisma.serviceItem.update({
                    where: { id: service.id },
                    data: { image: serviceImages[service.name] }
                });
                console.log(`Updated image for: ${service.name} -> ${serviceImages[service.name]}`);
            }
        }
        console.log('Finished updating images.');
    } catch (error) {
        console.error("Error updating images:", error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
