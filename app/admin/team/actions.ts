"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function createTeamMember(formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const facebook = formData.get("facebook") as string || "#";
    const twitter = formData.get("twitter") as string || "#";
    const instagram = formData.get("instagram") as string || "#";
    const imageFile = formData.get("image") as File;

    let imagePath = "/about/team1.jpg"; // Default

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), "public", "uploads", filename);
        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    const socials = JSON.stringify({
        facebook,
        twitter,
        instagram
    });

    await prisma.teamMember.create({
        data: {
            name,
            role,
            image: imagePath,
            socials
        }
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
}

export async function deleteTeamMember(id: string) {
    await prisma.teamMember.delete({
        where: { id }
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
}

export async function updateTeamMember(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const facebook = formData.get("facebook") as string || "#";
    const twitter = formData.get("twitter") as string || "#";
    const instagram = formData.get("instagram") as string || "#";
    const imageFile = formData.get("image") as File;

    const currentMember = await prisma.teamMember.findUnique({
        where: { id }
    });

    let imagePath = currentMember?.image || "/about/team1.jpg";

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const path = join(process.cwd(), "public", "uploads", filename);
        await writeFile(path, buffer);
        imagePath = `/uploads/${filename}`;
    }

    const socials = JSON.stringify({
        facebook,
        twitter,
        instagram
    });

    await prisma.teamMember.update({
        where: { id },
        data: {
            name,
            role,
            image: imagePath,
            socials
        }
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
}
