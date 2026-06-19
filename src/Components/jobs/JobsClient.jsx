// components/jobs/JobsClient.jsx
"use client";
import { useState, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilter from "@/components/jobs/JobSearchFilter";
import { Briefcase } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

export default function JobsClient({ jobs, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [selectedType, setSelectedType] = useState(filters.jobType || "all");
    const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
    const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);

    const router = useRouter();

    useEffect(() => {
        const sp = new URLSearchParams()

        if (searchQuery) {
            sp.set('search', searchQuery);
        }

        if (selectedType !== 'all') {
            sp.set('jobType', selectedType);
        }

        if (selectedCategory !== 'all') {
            sp.set('jobCategory', selectedCategory);
        }

        if (isRemoteOnly) {
            sp.set('isRemote', true)
        }

        const path = `?${sp.toString()}`
        router.push(path);
    }, [router, searchQuery, selectedType, selectedCategory, isRemoteOnly])


    return (
        <div className="flex flex-col">
            <JobSearchFilter searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isRemoteOnly={isRemoteOnly}
                setIsRemoteOnly={setIsRemoteOnly} />

            {jobs.length > 0 ? (
                <div className="flex flex-col gap-4 mt-6">
                    <p className="text-white/40 text-sm">{jobs.length} jobs found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map((job) => (
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