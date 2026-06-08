"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim()) return toast.error("Please enter your email address.");
        if (!form.password) return toast.error("Please enter your password.");

        setLoading(true);
        try {
            const { error: authError } = await authClient.signIn.email({
                email: form.email,
                password: form.password,
            });

            if (authError) {
                toast.error(authError.message || "Invalid email or password.");
            } else {
                toast.success("Welcome back!");
                router.refresh();
                router.push("/");
            }
        } catch (err) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden pt-24">

            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100"
                    style={{ background: "radial-gradient(ellipse at top, rgba(124,92,245,0.15) 0%, transparent 60%)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-100 h-100"
                    style={{ background: "radial-gradient(circle, rgba(124,92,245,0.06) 0%, transparent 70%)" }}
                />
                {/* dot grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white text-xs mb-8 transition-colors duration-200 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Back to Home
                </Link>

                {/* Card */}
                <div
                    className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl md:w-120"
                    style={{ boxShadow: "0 0 0 1px rgba(124,92,245,0.08), 0 32px 64px rgba(0,0,0,0.5)" }}
                >
                    {/* Logo + header */}
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Hireloop"
                                width={140}
                                height={140}
                                className="h-7 w-auto mb-6"
                            />
                        </Link>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-gray-500 text-sm mt-1.5">
                            Sign in to continue to Hireloop
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 tracking-wide">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                autoComplete="email"
                                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7c5cf5]/60 focus:bg-white/6 transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-gray-400 tracking-wide">
                                    Password
                                </label>

                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7c5cf5]/60 focus:bg-white/6 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                                >
                                    {showPassword
                                        ? <EyeOff className="w-4 h-4" />
                                        : <Eye className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-[#7c5cf5] hover:bg-[#6d4fe8] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 mt-1"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/6" />
                        <span className="text-gray-600 text-xs">or</span>
                        <div className="flex-1 h-px bg-white/6" />
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-gray-500 text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="text-[#7c5cf5] hover:text-[#9d82f8] font-medium transition-colors duration-200"
                        >
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Bottom note */}
                <p className="text-center text-gray-700 text-xs mt-6">
                    Protected by enterprise-grade encryption
                </p>
            </div>
        </main>
    );
}