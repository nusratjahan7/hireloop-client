"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Label, Radio, RadioGroup } from "@heroui/react";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupForm({ redirectTo = "/" }) {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [role, setRole] = useState("seeker");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) return toast.error("Please enter your full name.");
        if (!form.email.trim()) return toast.error("Please enter your email address.");
        if (form.password.length < 8) return toast.error("Password must be at least 8 characters.");

        setLoading(true);

        const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free';

        try {
            const { error: authError } = await authClient.signUp.email({
                name: form.name,
                email: form.email,
                password: form.password,
                role: role,
                plan,
            });

            if (authError) {
                toast.error(authError.message || "Something went wrong. Please try again.");
            } else {
                toast.success("Account created successfully!");
                setSuccess(true);
                router.push(redirectTo);
            }
        } catch (err) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const passwordStrength = () => {
        const p = form.password;
        if (!p) return null;
        if (p.length < 6) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
        if (p.length < 10) return { label: "Fair", color: "bg-yellow-400", width: "w-2/3" };
        return { label: "Strong", color: "bg-emerald-400", width: "w-full" };
    };

    const strength = passwordStrength();

    return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden pt-24 pb-4">

            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100"
                    style={{ background: "radial-gradient(ellipse at top, rgba(124,92,245,0.15) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 right-0 w-100 h-100"
                    style={{ background: "radial-gradient(circle, rgba(124,92,245,0.06) 0%, transparent 70%)" }} />
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }} />
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Back link */}
                <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white text-xs mb-8 transition-colors duration-200 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Back to Sign In
                </Link>

                {/* Card */}
                <div className="bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl md:w-120"
                    style={{ boxShadow: "0 0 0 1px rgba(124,92,245,0.08), 0 32px 64px rgba(0,0,0,0.5)" }}>

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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
                        <p className="text-gray-500 text-sm mt-1.5">
                            Join thousands finding their dream job
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 tracking-wide">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                autoComplete="name"
                                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7c5cf5]/60 focus:bg-white/6 transition-all duration-200"
                            />
                        </div>

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

                        {/* Role  */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 tracking-wide">
                                Role
                            </label>
                            <RadioGroup
                                defaultValue="seeker"
                                name="role"
                                orientation="horizontal"
                                onChange={value => setRole(value)}
                            >
                                <Radio value="seeker">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Job Seeker</Label>
                                    </Radio.Content>
                                </Radio>
                                <Radio value="recruiter">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Recruiter</Label>
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Min. 8 characters"
                                    autoComplete="new-password"
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

                            {/* Password strength */}
                            {strength && (
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1 bg-white/6 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                                    </div>
                                    <span className={`text-[11px] font-medium ${strength.label === "Weak" ? "text-red-400" :
                                        strength.label === "Fair" ? "text-yellow-400" : "text-emerald-400"
                                        }`}>
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <p className="text-gray-600 text-[11px] leading-relaxed -mt-1">
                            By creating an account, you agree to our{" "}
                            <Link href="/terms" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors duration-200">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors duration-200">
                                Privacy Policy
                            </Link>.
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-[#7c5cf5] hover:bg-[#6d4fe8] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 mt-1"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/6" />
                        <span className="text-gray-600 text-xs">or</span>
                        <div className="flex-1 h-px bg-white/6" />
                    </div>

                    {/* Sign in link */}
                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link
                            href={`/auth/signin?redirect=${redirectTo}`}
                            className="text-[#7c5cf5] hover:text-[#9d82f8] font-medium transition-colors duration-200"
                        >
                            Sign In
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