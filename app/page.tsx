import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 pt-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          MicroSaaS Application
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Description of your Micro SaaS
        </p>
        <div className="flex justify-center space-x-4">
          <Button>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button variant="outline">
            <Link href="/pricing">View Pricing</Link>
          </Button> 
        </div>
      </main>
    </div>
  );
}
