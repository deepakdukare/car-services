"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Helper for determining service type from name
function getServiceType(name: string): "DIAGNOSTIC" | "PREVENTIVE" | "REPAIR" {
    const n = name.toLowerCase();
    if (n.includes("diagnostic") || n.includes("check") || n.includes("scan") || n.includes("inspection") || n.includes("checking")) return "DIAGNOSTIC";
    if (n.includes("maintenance") || n.includes("top-up") || n.includes("flush") || n.includes("cleaning") || n.includes("balancing") || n.includes("alignment") || n.includes("registration")) return "PREVENTIVE";
    return "REPAIR";
}

// Helper for extracting numeric price
function getBasePrice(priceStr: string): number {
    if (!priceStr || priceStr.toLowerCase().includes("request")) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

// Helper for extracting numeric duration in minutes
function getDurationMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const n = timeStr.toLowerCase();
    if (n.includes("on inspection") || n === "-" || n.includes("request")) return 0;
    const matches = n.match(/\d+/g);
    if (!matches) return 0;
    let val = parseInt(matches[matches.length - 1]);
    if (n.includes("hour")) val *= 60;
    if (n.includes("day")) val *= 1440;
    return val;
}

async function saveImage(imageFile: any): Promise<string | null> {
    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0 || imageFile.name === "undefined") {
        return null;
    }

    try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const uploadDir = join(process.cwd(), "public", "uploads");

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const path = join(uploadDir, filename);
        await writeFile(path, buffer);
        return `/uploads/${filename}`;
    } catch (error) {
        console.error("Image upload failed:", error);
        return null;
    }
}

export async function createService(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const categoryId = formData.get("categoryId") as string;
        const time = formData.get("time") as string;
        const description = formData.get("description") as string || "";
        const imageFile = formData.get("image");

        if (!name || !price || !categoryId) {
            throw new Error("Missing required fields: name, price, or categoryId");
        }

        const imagePath = await saveImage(imageFile) || "/services/general.png";

        await prisma.serviceItem.create({
            data: {
                name,
                price,
                basePrice: getBasePrice(price),
                time: time || "-",
                durationMinutes: getDurationMinutes(time),
                serviceType: getServiceType(name),
                status: "ACTIVE",
                categoryId,
                description,
                image: imagePath
            }
        });

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Action error [createService]:", error);
        throw new Error(error.message || "Failed to create service");
    }
}

export async function updateService(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const categoryId = formData.get("categoryId") as string;
        const time = formData.get("time") as string;
        const description = formData.get("description") as string || "";
        const imageFile = formData.get("image");

        if (!name || !price || !categoryId) {
            throw new Error("Missing required fields");
        }

        const updateData: any = {
            name,
            price,
            basePrice: getBasePrice(price),
            categoryId,
            time: time || "-",
            durationMinutes: getDurationMinutes(time),
            description,
        };

        const imagePath = await saveImage(imageFile);
        if (imagePath) {
            updateData.image = imagePath;
        }

        await prisma.serviceItem.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Action error [updateService]:", error);
        throw new Error(error.message || "Failed to update service");
    }
}

export async function deleteService(id: string) {
    try {
        await prisma.serviceItem.delete({
            where: { id }
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Action error [deleteService]:", error);
        throw new Error(error.message || "Failed to delete service");
    }
}

// ... keeping other functions as they were but with similar error handling if needed ...
// (I will focus on the main ones causing the error first)

export async function createProduct(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const highlight = formData.get("highlight") as string;
        const cardTitle = formData.get("cardTitle") as string;
        const cardDesc = formData.get("cardDesc") as string;
        const phone = formData.get("phone") as string;
        const ctaText = formData.get("ctaText") as string;
        const features = formData.get("features") as string;
        const imageFile = formData.get("image");

        if (!title || !cardTitle || !cardDesc) {
            throw new Error("Missing required fields");
        }

        const imagePath = await saveImage(imageFile) || "/images/oil-machine.png";

        await prisma.productSection.create({
            data: {
                id: cardTitle.toLowerCase().replace(/\s+/g, '-'),
                title,
                highlight,
                cardTitle,
                cardDesc,
                phone,
                ctaText,
                features,
                cardImage: imagePath
            }
        });

        revalidatePath("/admin/dashboard");
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error: any) {
        console.error("Action error [createProduct]:", error);
        throw new Error(error.message || "Failed to create product");
    }
}

export async function updateProduct(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const highlight = formData.get("highlight") as string;
        const cardTitle = formData.get("cardTitle") as string;
        const cardDesc = formData.get("cardDesc") as string;
        const phone = formData.get("phone") as string;
        const ctaText = formData.get("ctaText") as string;
        const features = formData.get("features") as string;
        const imageFile = formData.get("image");

        const updateData: any = {
            title,
            highlight,
            cardTitle,
            cardDesc,
            phone,
            ctaText,
            features,
        };

        const imagePath = await saveImage(imageFile);
        if (imagePath) {
            updateData.cardImage = imagePath;
        }

        await prisma.productSection.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/admin/dashboard");
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error: any) {
        console.error("Action error [updateProduct]:", error);
        throw new Error(error.message || "Failed to update product");
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.productSection.delete({
            where: { id }
        });
        revalidatePath("/admin/dashboard");
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error: any) {
        throw new Error("Failed to delete product");
    }
}

export async function updateSiteConfig(formData: FormData) {
    const phone = formData.get("phone") as string;
    const discountText = formData.get("discountText") as string;

    await prisma.siteConfig.upsert({
        where: { id: 1 },
        update: { phone, discountText },
        create: { id: 1, phone, discountText }
    });

    revalidatePath("/admin/site-config");
    revalidatePath("/");
    revalidatePath("/services");
}

export async function createStat(formData: FormData) {
    const label = formData.get("label") as string;
    const value = parseInt(formData.get("value") as string);
    const icon = formData.get("icon") as string || "BarChart3";

    await prisma.stats.create({
        data: {
            label,
            value,
            icon,
        } as any
    });

    revalidatePath("/admin/stats");
    revalidatePath("/");
}

export async function updateStat(id: string, formData: FormData) {
    const label = formData.get("label") as string;
    const value = parseInt(formData.get("value") as string);
    const icon = formData.get("icon") as string;

    const updateData: any = { label, value };
    if (icon) updateData.icon = icon;

    await prisma.stats.update({
        where: { id: id as any },
        data: updateData
    });

    revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
    await prisma.stats.delete({
        where: { id: id as any }
    });

    revalidatePath("/admin/stats");
}

export async function updateServicePackage(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const highlighted = formData.get("highlighted") === "true";
    const features = formData.get("features") as string;

    await prisma.servicePackage.upsert({
        where: { id },
        update: {
            title,
            price,
            highlighted,
            features
        },
        create: {
            id,
            title,
            price,
            highlighted,
            features
        }
    });

    revalidatePath("/admin/service-packages");
    revalidatePath("/");
    revalidatePath("/services");
}

export async function createServicePackage(formData: FormData) {
    const id = (formData.get("title") as string).toLowerCase().replace(/\s+/g, '-');
    await updateServicePackage(id, formData);
}

export async function deleteServicePackage(id: string) {
    await prisma.servicePackage.delete({
        where: { id }
    });
    revalidatePath("/admin/service-packages");
    revalidatePath("/");
    revalidatePath("/services");
}
