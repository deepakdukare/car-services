
import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const products = await prisma.productSection.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <ProductsClient products={products} />;
}
