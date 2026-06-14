import { getJobById } from '@/lib/api/jobs';
import { MapPin, Briefcase, CircleDollar, Calendar, Clock } from "@gravity-ui/icons";
import Image from "next/image";
import Link from 'next/link';

const currencySymbols = {
    usd: "$",
    eur: "€",
    bdt: "৳",
};

const JobDetail = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    const symbol = currencySymbols[job.currency] ?? job.currency?.toUpperCase();

    const deadlineFormatted = new Date(job.deadline).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric"
    });

    const postedFormatted = new Date(job.createAt).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric"
    });

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-5">

                {/* ── Hero header ── */}
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-4 overflow-hidden">
                    {/* Subtle gradient accent at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-blue-950/30 to-transparent pointer-events-none" />

                    <div className="relative p-7 flex flex-col sm:flex-row sm:items-start gap-5">
                        {/* Logo */}
                        <div className="shrink-0">
                            {job.companyLogo ? (
                                <Image
                                    src={job.companyLogo}
                                    alt={job.companyName}
                                    width={64}
                                    height={64}
                                    className="rounded-2xl object-cover border border-zinc-700 shadow-lg"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-base text-zinc-400 font-semibold">
                                    {job.companyName?.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Title block */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-1">
                                {job.companyName}
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-tight capitalize">
                                {job.jobTitle}
                            </h1>
                            <p className="text-sm text-zinc-500 mt-1.5 capitalize">
                                {job.jobCategory} · {job.jobType}
                            </p>
                        </div>

                        {/* Apply button — desktop */}
                        <button className="hidden sm:flex shrink-0 items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white text-sm font-medium rounded-xl px-6 h-11 shadow-lg shadow-blue-900/30">
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* ── Meta pills ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                        Overview
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <MapPin className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Location</p>
                            <p className="text-sm font-medium text-zinc-200">
                                {job.isRemote ? "Remote" : job.location}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <Briefcase className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Job type</p>
                            <p className="text-sm font-medium text-zinc-200 capitalize">{job.jobType}</p>
                        </div>

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <Clock className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Category</p>
                            <p className="text-sm font-medium text-zinc-200 capitalize">{job.jobCategory}</p>
                        </div>

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <CircleDollar className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Salary</p>
                            <p className="text-sm font-medium text-zinc-200">
                                {symbol}{Number(job.minSalary).toLocaleString()} – {symbol}{Number(job.maxSalary).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Deadline</p>
                            <p className="text-sm font-medium text-zinc-200">{deadlineFormatted}</p>
                        </div>

                        <div className="flex flex-col gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Posted</p>
                            <p className="text-sm font-medium text-zinc-200">{postedFormatted}</p>
                        </div>

                    </div>
                </div>

                {/* ── Description ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl divide-y divide-zinc-800">

                    <div className="p-6">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                            Responsibilities
                        </p>
                        <p className="text-zinc-300 text-sm leading-7 whitespace-pre-line">
                            {job.responsibilities}
                        </p>
                    </div>

                    <div className="p-6">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                            Requirements
                        </p>
                        <p className="text-zinc-300 text-sm leading-7 whitespace-pre-line">
                            {job.requirements}
                        </p>
                    </div>

                    {job.benefits && (
                        <div className="p-6">
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                                Benefits
                            </p>
                            <p className="text-zinc-300 text-sm leading-7 whitespace-pre-line">
                                {job.benefits}
                            </p>
                        </div>
                    )}

                </div>

                {/* ── CTA footer ── */}
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-base font-semibold text-white">Ready to apply?</p>
                            <p className="text-zinc-500 text-sm mt-0.5">
                                Applications close {deadlineFormatted}
                            </p>
                        </div>
                        <Link
                            href={`/jobs/${id}/apply`}
                            style={{ backgroundColor: '#2563eb' }}
                            className="flex items-center justify-center w-full sm:w-auto text-white text-sm font-medium rounded-xl px-4 h-11"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default JobDetail;