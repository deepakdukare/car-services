
import { PrismaClient } from "@prisma/client";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import mime from "mime"; // You might need to install 'mime' or use a simple map

const prisma = new PrismaClient();
const publicDir = join(process.cwd(), "public");

// Simple mime map if package not available
function getMimeType(filePath: string) {
    const ext = extname(filePath).toLowerCase();
    const map: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".webp": "image/webp"
    };
    return map[ext] || "application/octet-stream";
}

async function scanDirectory(dir: string, baseDir: string) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relativePath = fullPath.replace(baseDir, "").replace(/\\/g, "/"); // Normalize to web path

        if (entry.isDirectory()) {
            // Skip typical non-asset folders
            if (["uploads", "node_modules", ".git"].includes(entry.name)) {
                // We typically include uploads in DB media, but maybe not if we treat them specially
                // Let's include everything in public relevant to images
            }
            await scanDirectory(fullPath, baseDir);
        } else {
            if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(entry.name)) {
                const stats = await stat(fullPath);
                const mimeType = getMimeType(entry.name);
                const folderName = dir.replace(baseDir, "").replace(/\\/g, "/").split('/')[1] || "root";

                console.log(`Syncing: ${relativePath}`);

                await prisma.media.upsert({
                    where: { url: relativePath },
                    update: {
                        size: stats.size,
                        type: mimeType,
                    },
                    create: {
                        name: entry.name,
                        url: relativePath,
                        type: mimeType,
                        size: stats.size,
                        folder: folderName
                    }
                });
            }
        }
    }
}

async function main() {
    console.log("Starting Media Sync...");
    await scanDirectory(publicDir, publicDir);
    console.log("Media Sync Complete.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
