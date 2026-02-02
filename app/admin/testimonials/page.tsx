import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <TestimonialsClient testimonials={testimonials as any} />
        </div>
    );
}
