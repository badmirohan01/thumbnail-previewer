import { Button } from "@/components/ui/button";
const isSubscribed = true;

export default async function Pricing() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1>Subscription Plan</h1>
            <div>
                <h2>Full Access</h2>
                <p>Access to all features</p>
                <p>7299/month</p>
                {isSubscribed ? (
                    <form action="">
                        <Button type="submit">Manage Subscription</Button>
                    </form>
                ) : (
                    <form action="">
                        <Button type="submit">Subscribe Now</Button>
                    </form>
                )}
            </div>
        </div>
    );
}