import { RegisterForm } from "@/components/forms/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
    title: "Create Account",
    description: "Sign up for a new React Shop account.",
};

export default function RegisterPage() {
    return (
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                    <CardDescription>Enter your details below to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline text-primary">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
