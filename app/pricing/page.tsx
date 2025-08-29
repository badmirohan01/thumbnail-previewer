import { Button } from "@/components/ui/button";
import React from "react";
import { getStripeSession, stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getData(userId: string | null) {
    unstable_noStore()

    if (!userId) return null;

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: userId
        }, select: {
            status: true,
            user: { select: { stripeCustomerId: true } }
        }
    })
    return subscription
}

export default async function Pricing() {
    const session = await auth();
    const userId = session?.userId;
    const user = await currentUser();

    const subscription = await getData(userId);
    const isSubscribed = subscription?.status === 'active';

    async function createSubscription() {
        'use server'
        if (!userId) {
            return redirect('/sign-in?redirect_url=/pricing')
        }

        let databaseUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!databaseUser) {
            throw new Error('Database user not found')
        }
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!databaseUser.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: email,
            })

            databaseUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    stripeCustomerId: customer.id,
                },
                select: {
                    stripeCustomerId: true,
                }
            })
            console.log("Database user:", databaseUser)
        }

        if (!databaseUser.stripeCustomerId) {
            throw new Error('Failed to set stripe customer ID for the user')
        }

        const subscriptionUrl = await getStripeSession({
            priceId: process.env.STRIPE_PRICE_ID! as string,
            domainUrl: process.env.NODE_ENV === 'production' ? (process.env.PROD_URL as string) : 'http://localhost:3000',
            customerId: databaseUser.stripeCustomerId,
        })
        return redirect(subscriptionUrl)
    }

    async function createCustomerPortal() {
        'use server'
        if (!userId) {
            return redirect('/sign-in?redirect_url=/pricing')
        }

        const customerPortalUrl = await stripe.billingPortal.sessions.create({
            customer: subscription?.user.stripeCustomerId as string,
            return_url: process.env.NODE_ENV === 'production' ? (process.env.PROD_URL as string) : 'http://localhost:3000',
        })

        return redirect(customerPortalUrl.url as string)
    }

    const backlink = userId ? '/dashboard' : '/'

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Subscription Plan</h1>
            <div className="space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <Link href={backlink} className="text-sm font-medium text-primary underline-offset-4 hover:underline">&larr; Back</Link>
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Full Access</h2>
                <p className="leading-7">Access to all features</p>
                <p className="text-2xl font-bold">7299/month</p>
                {isSubscribed ? (
                    <form action={createCustomerPortal}>
                        <Button className="cursor-pointer" type="submit">Manage Subscription</Button>
                    </form>
                ) : (
                    <form action={createSubscription}>
                        <Button className="cursor-pointer" type="submit">Subscribe Now</Button>
                    </form>
                )}
            </div>
        </div>
    );
}