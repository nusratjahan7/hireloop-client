import Image from "next/image";
import Link from "next/link";

const footerLinks = [
    {
        title: "Product",
        links: [
            { label: "Job discovery", href: "/job-discovery" },
            { label: "Worker AI", href: "/worker-ai" },
            { label: "Companies", href: "/companies" },
            { label: "Salary data", href: "/salary-data" },
        ],
    },
    {
        title: "Navigations",
        links: [
            { label: "Help center", href: "/help" },
            { label: "Career library", href: "/career-library" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Brand Guidelines", href: "/brand-guidelines" },
            { label: "Newsroom", href: "/newsroom" },
        ],
    },
];

const socialLinks = [
    {
        href: "https://facebook.com",
        label: "Facebook",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        href: "https://instagram.com",
        label: "Instagram",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        href: "https://linkedin.com",
        label: "LinkedIn",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer className="bg-black mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Hireloop"
                                width={200}
                                height={200}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.title} className="flex flex-col gap-3">
                            <h4 className="text-white text-sm font-semibold">{col.title}</h4>
                            <ul className="flex flex-col gap-2">
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 my-8" />

                {/* Bottom section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright + legal */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs">
                        <span>Copyright 2024 — Programming menu</span>
                        <Link href="/terms" className="hover:text-white transition-colors duration-200">
                            Terms & Policy
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                            Privacy Guideline
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;