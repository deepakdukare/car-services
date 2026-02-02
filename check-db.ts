
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
    const products = await prisma.productSection.findMany();
    console.log("Product count:", products.length);
    products.forEach(p => {
        console.log(`--- Product: ${p.id} ---`);
        console.log(`Banner Title: ${p.title}`);
        console.log(`Banner Highlight: ${p.highlight}`);
        console.log(`Card Title: ${p.cardTitle}`);
        console.log(`Card Desc: ${p.cardDesc}`);
        console.log(`Features: \n${p.features}`);
        console.log(`Image: ${p.cardImage}`);
    });
    process.exit(0);
}

check();
