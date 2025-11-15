"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut } from "lucide-react";

function AccountSkeleton() {
    return (
        <div className="container py-12">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        </div>
    );
}

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/account");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <AccountSkeleton />;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">My Account</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name}!</CardTitle>
          <CardDescription>This is your account dashboard. You can view your details and past orders here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h3 className="font-semibold">Name</h3>
                <p className="text-muted-foreground">{user?.name}</p>
            </div>
            <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">{user?.email}</p>
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={logout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
