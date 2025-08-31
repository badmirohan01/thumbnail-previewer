import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThumbnailPreviewer from "./_components/thumbnail-previewer";

export default async function Dashboard() {
    const { userId } = await auth();
    if (!userId) {
        return redirect('/sign-in?redirect_url=/dashboard')
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: userId
        }, select: {
            status: true
        }
    })

    if (subscription?.status !== 'active') {
        return (
            <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md">
                <p className="text-xl mb-6">You are not subscribed.</p>
                <Button>
                    <Link href="/pricing">Subscribe</Link>
                </Button>
            </div>
        )
    }
    const channelName = "life_guru"

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md">
                <p className="text-xl mb-6">You are Subscribed and good to go</p>
                <ThumbnailPreviewer channelNameSaved={channelName} />
            </div>
        </>
    );
}