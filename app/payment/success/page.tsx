'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cancelled(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 text-center">
            <h1 className="font-bold text-2xl">Payment Successful</h1>
            <div className="w-[300px] h-[2px] bg-green-300"></div>
            <p className="text-xl">Your payment has been recieved. Thankyou for your purchase.</p>
            <Button>
                <Link href='/pricing'>Go to Dashboard</Link>
            </Button>
        </div>
    )
}