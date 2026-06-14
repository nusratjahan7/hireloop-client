import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";

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

    const job = await getJobById(id);
    // console.log(job);

    return (
        <div className='pt-24 px-6'>
            <h2>Apply for {job.jobTitle}</h2>
            <JobApply job={job} />
        </div>
    );
};

export default ApplyPage;