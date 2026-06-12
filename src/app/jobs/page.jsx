import JobCard from '@/Components/jobs/JobCard';
import { getJobs } from '@/lib/api/jobs';
import { Briefcase } from "@gravity-ui/icons";

const BrowseJobs = async () => {
    const jobs = await getJobs();

    return (
        <div className='pt-24 px-6'>
            {jobs?.length > 0 ? (
                <>
                    <h2 className="text-white/40 text-sm mb-6">{jobs.length} jobs found</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-zinc-600" />
                    </div>
                    <h3 className="text-white font-medium text-lg">No jobs available</h3>
                    <p className="text-zinc-600 text-sm max-w-xs">
                        There are no open positions right now. Check back later.
                    </p>
                </div>
            )}
        </div>
    );
};

export default BrowseJobs;