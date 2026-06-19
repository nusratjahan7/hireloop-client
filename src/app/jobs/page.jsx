// app/jobs/page.jsx
import JobsClient from "@/Components/jobs/JobsClient";
import { getJobs } from "@/lib/api/jobs";

const BrowseJobs = async ({ searchParams }) => {

    const filters = await searchParams;
    const filterObj = {
        ...filters,
        isRemote: filters.isRemote === 'true' ? true : false
    }

    const querySearch = new URLSearchParams(filters);
    const queryString = querySearch.toString();

    const { jobs, total } = await getJobs(queryString);

    return (
        <div className="pt-24 px-6">
            <div className="max-w-7xl mx-auto mb-6">
                <h1 className="text-4xl font-bold tracking-tight">Open Positions</h1>
                <p className="text-zinc-400 mt-2">Discover your next challenge.</p>
            </div>
            <div className="max-w-7xl mx-auto">
                <JobsClient filters={filterObj} jobs={jobs || []} total={total} />
            </div>
        </div>
    );
};

export default BrowseJobs;