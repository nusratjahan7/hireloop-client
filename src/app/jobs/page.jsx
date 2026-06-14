// app/jobs/page.jsx
import JobsClient from "@/components/jobs/JobsClient";
import { getJobs } from "@/lib/api/jobs";

const BrowseJobs = async () => {
    const jobs = await getJobs();

    return (
        <div className="pt-24 px-6">
            <div className="max-w-7xl mx-auto mb-6">
                <h1 className="text-4xl font-bold tracking-tight">Open Positions</h1>
                <p className="text-zinc-400 mt-2">Discover your next challenge.</p>
            </div>
            <div className="max-w-7xl mx-auto">
                <JobsClient jobs={jobs} />
            </div>
        </div>
    );
};

export default BrowseJobs;