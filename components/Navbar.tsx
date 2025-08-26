"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

export const Navbar = () => {
    const isSigned = true;
    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 text-lg">
                <Link href="/" className="p-2 font-medium">
                    SaaS
                </Link>
                <div className="space-x-2">
                    {isSigned ? (
                        <>
                            <Link href="/dashboard" className="p-2 font-medium">
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/profile"
                                className="p-2 font-medium"
                            >
                                Profile
                            </Link>
                        </>
                    ) : (
                        <></>
                    )}
                    <Link href="/pricing" className="p-2 font-medium">
                        Pricing
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    {isSigned ? <a>Sign out</a> : <a>Sign in</a>}
                </div>
            </div>
        </nav>
    );
};