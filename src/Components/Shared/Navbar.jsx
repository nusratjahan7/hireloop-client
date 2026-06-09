"use client";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return <div className="inline-flex items-center justify-center p-4"><Spinner size="lg" /></div>
    }


    const handleSignOutDes = async () => {
        try {
            await authClient.signOut();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            setMenuOpen(false);
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    const linkClass =
        "text-sm text-gray-300 hover:text-white transition-colors duration-200";
    const SignInClass =
        "text-sm text-[#7c5cf5] hover:text-[#6d4fe8] transition-colors duration-200";

    return (
        <nav className="bg-[#222222] mx-4 mt-4 fixed top-0 left-0 right-0 z-50  rounded-2xl">

            <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                height={200}
                                width={200}
                                src="/assets/images/logo.png"
                                alt="Hireloop"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className={linkClass}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        {
                            user ? <div className="hidden md:flex items-center gap-4">
                                <div className="w-px h-5 bg-white/20" />
                                <Link href="/profile" className={SignInClass}>
                                    {user.name}
                                </Link>
                                <button
                                    onClick={handleSignOutDes}
                                    className="text-sm font-medium bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    SignOut
                                </button>
                            </div> : <div className="hidden md:flex items-center gap-4">
                                <div className="w-px h-5 bg-white/20" />
                                <Link href="/auth/signin" className={SignInClass}>
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="text-sm font-medium bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        }

                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={linkClass}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-full h-px bg-white/10" />
                    {
                        user ? <div className="flex flex-col gap-4">
                            <Link
                                href="/profile"
                                className={SignInClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                {user.name}
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="text-sm font-medium text-center bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                SignOut
                            </button>
                        </div> : <div className="flex flex-col gap-4">
                            <Link
                                href="/auth/signin"
                                className={SignInClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="text-sm font-medium text-center bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav >
    );
};

export default Navbar;