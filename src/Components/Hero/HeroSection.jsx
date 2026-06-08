"use client";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";

const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
    {
        icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V6a2.25 2.25 0 0 1 2.25-2.25h4.5M15.75 3.75h4.5v4.5m-9-1.5 9-3" />
            </svg>
        ),
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
        ),
        value: "12K",
        label: "Companies",
    },
    {
        icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803m10.607 0A7.5 7.5 0 0 1 5.196 15.803" />
            </svg>
        ),
        value: "2M",
        label: "Job Seekers",
    },
    {
        icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        ),
        value: "97%",
        label: "Satisfaction Rate",
    },
];

const HeroSection = () => {
    return (
        <section className="relative bg-black overflow-hidden mt-20">
            {/* ── Starfield dots ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* ── Top hero content ── */}
            <div className="relative z-10 flex flex-col items-center pt-14 pb-0 px-4 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-7 bg-white/5 backdrop-blur-sm">
                    <span className="text-sm">🔥</span>
                    <span className="text-white text-xs font-bold tracking-widest uppercase">
                        50,000+{" "}
                        <span className="text-gray-400 font-normal tracking-wide normal-case">
                            New Jobs This Month
                        </span>
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-tight tracking-tight max-w-2xl">
                    Find Your Dream Job Today
                </h1>

                {/* Subtext */}
                <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
                    Hireloop connects top talent with world-class companies. Browse
                    thousands of curated opportunities and land your next role — faster.
                </p>

                {/* Search bar */}
                <div className="mt-7 w-full max-w-xl flex items-center bg-[#16171f] border border-white/10 rounded-xl px-4 py-1 gap-2 shadow-xl">
                    <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Job title, skill or company"
                        className="flex-1 min-w-0 bg-transparent py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                    <div className="w-px h-5 bg-white/10 flex-shrink-0" />
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 ml-1" />
                    <input
                        type="text"
                        placeholder="Location or Remote"
                        className="flex-1 min-w-0 bg-transparent py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                    <button className="flex-shrink-0 bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white p-2.5 rounded-lg transition-colors duration-200 ml-1">
                        <Search className="w-4 h-4" />
                    </button>
                </div>

                {/* Trending tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                    <span className="text-gray-500 text-xs">Trending Position</span>
                    {trendingTags.map((tag) => (
                        <button
                            key={tag}
                            className="text-xs text-gray-300 bg-white/5 border border-white/10 hover:border-[#7c5cf5]/50 hover:text-white rounded-full px-3 py-1 transition-colors duration-200"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Globe + glow ── */}
            <div className="relative w-full flex flex-col items-center mt-6">


                {/* "Assisting over" text — sits above the bottom of the globe */}
                <div className="absolute bottom-[58%] left-1/2 -translate-x-1/2 z-20 text-center w-full px-4 pointer-events-none">
                    <p className="text-white text-lg sm:text-2xl md:text-3xl font-light leading-snug drop-shadow-lg">
                        Assisting over{" "}
                        <span className="font-semibold">15,000 job seekers</span>
                        <br />
                        find their dream positions.
                    </p>
                </div>

                {/* Globe image */}
                <div className="relative w-full max-w-3xl lg:max-w-4xl mx-auto z-10">
                    <Image
                        src="/assets/images/globe1.png"
                        alt="Globe"
                        width={1200}
                        height={900}
                        className="w-full h-auto object-contain"
                        priority
                    />
                    {/* fade bottom into stats */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/60 to-transparent pointer-events-none" />
                </div>
            </div>

            {/* ── Stats bar ── */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 pb-8 -mt-50 lg:-mt-90 bg-black">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col gap-3 px-5 py-5 rounded-2xl backdrop-blur-sm bg-gradient-to-t from-[#2a2a2aa1] via-[#111111] to-[#0a0a0a]"
                    >
                        {stat.icon}
                        <span className="text-white text-3xl font-bold tracking-tight">
                            {stat.value}
                        </span>
                        <span className="text-gray-500 text-xs">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HeroSection;