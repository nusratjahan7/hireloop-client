import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { getJobs } from "@/lib/api/jobs";
import JobCard from "./JobCard";


const RecentJobs = async () => {

    const data = await getJobs() || {};


    const jobsArray = Array.isArray(data) ? data : data.jobs || [];

    const latestJobs = [...jobsArray]
        .sort((a, b) => {

            if (b._id && a._id) {
                return b._id.toString().localeCompare(a._id.toString());
            }

            if (b.createdAt && a.createdAt) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }

            return 0;
        })
        .slice(0, 6);

    return (
        <section className="py-12 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading Area */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Latest Job Openings
                        </h2>
                        <p className="mt-2 text-base text-zinc-400">
                            Discover your next career move from top tech companies.
                        </p>
                    </div>

                    <Link
                        href="/jobs"
                        className="hidden sm:flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group"
                    >
                        View All Jobs
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Job Cards Grid */}
                {latestJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestJobs.map((job) => (
                            <JobCard key={job._id || job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-zinc-500 mb-2">No recent jobs found.</p>
                        <p className="text-xs text-zinc-700">Check your API function to ensure data is array-structured.</p>
                    </div>
                )}

                {/* Mobile View All Button */}
                <div className="mt-8 flex justify-center sm:hidden">
                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-medium text-white hover:bg-zinc-800 transition-colors w-full justify-center"
                    >
                        View All Jobs
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default RecentJobs;