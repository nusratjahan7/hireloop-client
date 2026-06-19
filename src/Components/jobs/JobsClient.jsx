// components/jobs/JobsClient.jsx
"use client";
import { useState, useEffect } from "react";
import JobCard from "@/Components/jobs/JobCard";
import JobSearchFilter from "@/Components/jobs/JobSearchFilter";
import { Briefcase } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function JobsClient({ jobs, filters, total }) {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [selectedType, setSelectedType] = useState(filters.jobType || "all");
    const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
    const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
    const [page, setPage] = useState(filters.page || 1);

    const router = useRouter();

    const totalItems = total;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }
        pages.push(totalPages);

        return pages;
    }

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

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

        if (page) {
            sp.set('page', page)
        }

        const path = `?${sp.toString()}`
        router.push(path);
    }, [router, searchQuery, selectedType, selectedCategory, isRemoteOnly, page])


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
                <>
                    <div className="flex flex-col gap-4 mt-6">
                        <p className="text-white/40 text-sm">{jobs.length} jobs found</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    </div>

                    {/* pagination */}

                    <Pagination className="w-full mt-4">
                        <Pagination.Summary>
                            Showing {startItem}-{endItem} of {totalItems} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ),
                            )}
                            <Pagination.Item>
                                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
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