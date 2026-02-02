import { prisma } from "@/lib/prisma";
import TeamClient from "./TeamClient";

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <TeamClient teamMembers={teamMembers} />
        </div>
    );
}
