import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { Briefcase, Lock } from "@gravity-ui/icons";

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Seekers only</h2>
                        <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">
                            Only job seekers can apply for positions. Sign in with a seeker account to proceed.
                        </p>
                    </div>
                    <Link
                        href="/sign-in"
                        className="flex items-center justify-center w-full text-white text-sm font-medium rounded-xl h-11"
                        style={{ backgroundColor: '#2563eb' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                        Sign in as seeker
                    </Link>
                    <Link href="/jobs" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                        Back to jobs
                    </Link>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);

    const plan = {
        name: 'Free',
        maxApplicationsPerMonth: 3
    };

    const job = await getJobById(id);
    const used = applications.length;
    const limit = plan.maxApplicationsPerMonth;
    const remaining = limit - used;
    const isLimitReached = used >= limit;

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">

                {/* Usage banner */}
                <div className={`rounded-2xl border p-4 flex items-center justify-between gap-4 ${isLimitReached
                    ? "bg-red-950/30 border-red-900/50"
                    : "bg-zinc-900 border-zinc-800"
                    }`}>
                    <div className="flex items-center gap-3">
                        {isLimitReached && (
                            <div className="w-8 h-8 rounded-lg bg-red-900/40 border border-red-800/50 flex items-center justify-center shrink-0">
                                <Lock className="w-4 h-4 text-red-400" />
                            </div>
                        )}
                        <div>
                            <p className={`text-sm font-medium ${isLimitReached ? "text-red-300" : "text-zinc-300"}`}>
                                {isLimitReached
                                    ? "Monthly application limit reached"
                                    : `${remaining} application${remaining !== 1 ? "s" : ""} remaining this month`}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">
                                {used} of {limit} used · {plan.name} plan
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/plans"
                        className="shrink-0 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 h-8 flex items-center transition-colors"
                    >
                        Upgrade
                    </Link>
                </div>

                {/* Limit reached state */}
                {isLimitReached ? (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-zinc-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">You've hit your limit</h2>
                            <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed max-w-xs">
                                You've used all {limit} applications on the {plan.name} plan this month. Upgrade to apply to more positions.
                            </p>
                        </div>
                        <Link
                            href="/plans"
                            className="flex items-center justify-center w-full sm:w-auto text-white text-sm font-medium rounded-xl px-4 h-11"
                            style={{ backgroundColor: '#2563eb' }}
                        >
                            View plans
                        </Link>
                        <Link href={`/jobs/${id}`} className="text-xs text-zinc-600 hover:text-zinc-400 p-4 transition-colors">
                            Back to job
                        </Link>
                    </div>
                ) : (
                    <JobApply applicant={user} job={job} />
                )}

            </div>
        </div>
    );
};

export default ApplyPage;