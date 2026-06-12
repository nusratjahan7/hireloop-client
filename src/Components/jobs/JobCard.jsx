import Link from "next/link";
import { MapPin, Briefcase, CircleDollar, Calendar, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const currencySymbols = {
    usd: "$",
    eur: "€",
    bdt: "৳",
};

const JobCard = ({ job }) => {
    if (!job) return null;

    const symbol = currencySymbols[job.currency] ?? job.currency?.toUpperCase();

    return (
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-6  flex flex-col gap-4">

            {/* Company */}
            <div className="flex items-center gap-3">
                {job.companyLogo ? (
                    <Image
                        src={job.companyLogo}
                        alt={job.companyName}
                        width={44}
                        height={44}
                        className="rounded-xl object-cover border border-zinc-700"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 font-medium">
                        {job.companyName?.slice(0, 2).toUpperCase()}
                    </div>
                )}

                <span className="text-lg font-semibold text-white">
                    {job.companyName}
                </span>
            </div>

            {/* Title + category */}
            <div>
                <h3 className="text-xl font-medium text-white capitalize leading-snug">
                    {job.jobTitle}
                </h3>
                <p className="text-sm text-zinc-600 capitalize mt-0.5">
                    {job.jobCategory} · {job.jobType}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.isRemote ? "Remote" : job.location}
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-400">
                    <Briefcase className="w-3.5 h-3.5" />
                    {job.isRemote ? "Remote" : "On-site"}
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-400">
                    <CircleDollar className="w-3.5 h-3.5" />
                    {symbol}{Number(job.minSalary).toLocaleString()} – {symbol}{Number(job.maxSalary).toLocaleString()}
                </span>
            </div>

            {/* Divider */}
            <hr className="border-zinc-800" />

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {new Date(job.deadline).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric"
                    })}
                </span>
                <Link
                    href={`/jobs/${job._id}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-zinc-300 transition-colors"
                >
                    Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

        </div>
    );
};

export default JobCard;