"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function createTestimonial(formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const review = formData.get("review") as string;
    const ratingStr = formData.get("rating") as string;
    const imageFile = formData.get("image") as File;

    let rating = 5;
    if (ratingStr) {
        rating = parseInt(ratingStr, 10);
    }

    let imagePath = "/testimonials/user1.jpg"; // Default

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), "public", "uploads", filename);

        // Ensure uploads directory exists (in real app, do this check once)
        // await mkdir(join(process.cwd(), "public", "uploads"), { recursive: true });

        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    await prisma.testimonial.create({
        data: {
            name,
            role,
            review,
            image: imagePath,
            rating: rating
        }
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({
        where: { id }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
}

export async function updateTestimonial(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const review = formData.get("review") as string;
    const ratingStr = formData.get("rating") as string;
    const imageFile = formData.get("image") as File;

    let rating = 5;
    if (ratingStr) {
        rating = parseInt(ratingStr, 10);
    }

    const currentTestimonial = await prisma.testimonial.findUnique({
        where: { id }
    });

    let imagePath = currentTestimonial?.image || "/testimonials/user1.jpg";

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), "public", "uploads", filename);

        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    await prisma.testimonial.update({
        where: { id },
        data: {
            name,
            role,
            review,
            image: imagePath,
            rating: rating
        }
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
}
