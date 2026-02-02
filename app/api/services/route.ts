import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Retrieve a list of all car services
 *     description: Fetches all service items from the database.
 *     responses:
 *       200:
 *         description: A list of services.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceItem'
 */
export async function GET() {
    try {
        const services = await prisma.serviceItem.findMany({
            include: {
                category: true
            }
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     description: Adds a new service item to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               time:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service created successfully.
 *       400:
 *         description: Missing required fields.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, price, categoryId, time, description, image } = body;

        if (!name || !price || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newService = await prisma.serviceItem.create({
            data: {
                name,
                price,
                categoryId,
                time: time || "-",
                description: description || "",
                image: image || "/services/general.png"
            }
        });

        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
