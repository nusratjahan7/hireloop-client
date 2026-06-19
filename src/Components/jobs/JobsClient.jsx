"use client";
import { useState, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilter from "@/components/jobs/JobSearchFilter";
import { Briefcase } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function JobsClient({ jobs = [], filters, total = 0 }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedType, setSelectedType] = useState(filters.jobType || "all");
    const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
    const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
    const [page, setPage] = useState(Number(filters.page) || 1);

    const router = useRouter();
    const itemsPerPage = 12;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, total);

    useEffect(() => {
        const sp = new URLSearchParams();

        if (searchQuery) sp.set('search', searchQuery);
        if (selectedType !== 'all') sp.set('jobType', selectedType);
        if (selectedCategory !== 'all') sp.set('jobCategory', selectedCategory);
        if (isRemoteOnly) sp.set('isRemote', "true");
        if (page > 1) sp.set('page', String(page));

        const path = `?${sp.toString()}`;
        router.push(path);
    }, [router, searchQuery, selectedType, selectedCategory, isRemoteOnly, page]);

    return (
        <div className="flex flex-col">
            <JobSearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isRemoteOnly={isRemoteOnly}
                setIsRemoteOnly={setIsRemoteOnly}
            />

            {jobs.length > 0 ? (
                <>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p className="text-white/40 text-sm">{total} jobs found</p>
                            <p className="text-white/40 text-sm">
                                Showing {startItem}-{endItem} of {total} results
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {jobs.map((job) => (
                                <JobCard key={job._id?.$oid || job._id || job.id} job={job} />
                            ))}
                        </div>
                    </div>


                    {totalPages > 1 && (
                        <div className="flex justify-center w-full mt-8">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={totalPages}
                                onChange={(newPage) => setPage(newPage)}
                                classNames={{
                                    wrapper: "gap-1",
                                    item: "bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium rounded-lg hover:bg-zinc-800",
                                    cursor: "bg-sky-600 text-white font-semibold rounded-lg",
                                    prev: "bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400",
                                    next: "bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400",
                                }}
                            />
                        </div>
                    )}
                </>
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