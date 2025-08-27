"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { SignInButton, SignUpButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    const isSigned = true;
    return (
        <nav className="bg-background border-b">
            <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center h-16 text-lg">
                <Link href="/" className="p-2 font-medium">
                    SaaS
                </Link>
                <div className="space-x-2">
                    <SignedIn>
                        <Link href="/dashboard" className="p-2 font-medium">
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className="p-2 font-medium"
                        >
                            Profile
                        </Link>
                        <Link href="/pricing" className="p-2 font-medium">
                            Pricing
                        </Link>
                    </SignedIn>


                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton>
                            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-between items-center">
                <Link href='/' className='p-2 font-medium'>
                    SaaS
                </Link>
                <div>
                    <SignedIn>
                        <Link href='/dashboard'>Dashboard</Link>
                        <Link href='/dashboard/profile'>Profile</Link>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton>
                            <button className='bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};