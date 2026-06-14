// components/jobs/JobsClient.jsx
"use client";
import { useState, useMemo } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilter from "@/components/jobs/JobSearchFilter";
import { Briefcase } from "@gravity-ui/icons";

export default function JobsClient({ jobs }) {
    const [filters, setFilters] = useState({});

    const filtered = useMemo(() => {
        if (!jobs) return [];
        return jobs.filter((job) => {
            const { search, category, jobType } = filters;

            if (search) {
                const q = search.toLowerCase();
                const matches =
                    job.jobTitle?.toLowerCase().includes(q) ||
                    job.companyName?.toLowerCase().includes(q) ||
                    job.jobCategory?.toLowerCase().includes(q);
                if (!matches) return false;
            }

            if (category && job.jobCategory?.toLowerCase() !== category) return false;
            if (jobType && job.jobType?.toLowerCase() !== jobType) return false;

            return true;
        });
    }, [jobs, filters]);

    return (
        <div className="flex flex-col">
            <JobSearchFilter onFilterChange={setFilters} />

            {filtered.length > 0 ? (
                <div className="flex flex-col gap-4 mt-6">
                    <p className="text-white/40 text-sm">{filtered.length} jobs found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 gap-4 text-center mt-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-zinc-600" />
                    </div>
                    <h3 className="text-white font-medium text-lg">No jobs found</h3>
                    <p className="text-zinc-600 text-sm max-w-xs">
                        Try adjusting your filters or search term.
                    </p>
                </div>
            )}
        </div>
    );
}