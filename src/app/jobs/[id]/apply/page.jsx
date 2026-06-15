import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-zinc-300 p-6">
                <p>Only job seekers can apply for positions. <br className="md:hidden" /> Please sign in with a seeker account to proceed.</p>
            </div>
        )
    }

    const applications = await getApplicationsByApplicant(user.id);

    const plan = {
        name: 'Free',
        maxApplicationsPerMonth: 3
    }

    const job = await getJobById(id);
    // console.log(job);

    return (
        <div className='pt-24 px-6'>
            <h2 className="text-zinc-400 max-w-2xl mx-auto px-6 mb-2">You have applied so far: {applications.length} out of {plan.maxApplicationsPerMonth} this month</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto px-6 mb-4">Purchase plan to apply more positions. <Link href={'/plans'} className="text-white">View Plans</Link> </p>
            {applications.length < plan.maxApplicationsPerMonth && (
                <JobApply applicant={user} job={job} />
            )}
        </div>
    );
};

export default ApplyPage;