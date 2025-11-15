import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
    title: "Login",
    description: "Login to your React Shop account.",
};

export default function LoginPage() {
    return (
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="underline text-primary">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
