import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';

const STATUS_STYLES = {
    pending: 'bg-[#f59e0b] text-[#451a03]',
    reviewing: 'bg-[#0ea5e9] text-[#082f49]',
    shortlisted: 'bg-[#8b5cf6] text-[#2e1065]',
    interview: 'bg-[#8b5cf6] text-[#2e1065]',
    accepted: 'bg-[#10b981] text-[#022c22]',
    hired: 'bg-[#10b981] text-[#022c22]',
    rejected: 'bg-[#f43f5e] text-[#4c0519]',
    withdrawn: 'bg-[#64748b] text-[#020617]',
};

function StatusBadge({ status }) {
    const key = (status || '').toLowerCase();
    const classes = STATUS_STYLES[key] || 'bg-slate-600 text-slate-100';
    const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>
            {label}
        </span>
    );
}

function formatDate(dateString) {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const Applications = async () => {
    const user = await getUserSession();
    const jobs = (await getApplicationsByApplicant(user.id)) || [];

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100 pt-4">
            <div className="shrink-0 px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold">My Applications</h1>
                <p className="mt-1 text-sm text-slate-400">
                    {jobs.length} application{jobs.length === 1 ? '' : 's'} submitted
                </p>
            </div>

            <div className="flex-1 overflow-hidden px-4 pb-6 sm:px-6 lg:px-8">
                <div className="h-full overflow-auto rounded-xl border border-slate-800 bg-slate-900">
                    <table className="w-full min-w-160 text-left text-sm">
                        <thead className="sticky top-0 z-10 bg-slate-900">
                            <tr className="border-b border-slate-800 text-slate-400">
                                <th className="px-5 py-3 font-medium">Company</th>
                                <th className="px-5 py-3 font-medium">Job Title</th>
                                <th className="px-5 py-3 font-medium">Applied Date</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                                        No applications yet.
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr
                                        key={job._id}
                                        className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50"
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-100">{job.companyName}</td>
                                        <td className="px-5 py-4 text-slate-200">{job.jobTitle}</td>
                                        <td className="px-5 py-4 text-slate-200">{formatDate(job.appliedAt)}</td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={job.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Applications;