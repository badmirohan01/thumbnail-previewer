import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md">
            <p className="text-xl mb-6">You are not subscribed.</p>
            <Button>
                <Link href="/pricing">Subscribe</Link>
            </Button>
        </div>
    );
}