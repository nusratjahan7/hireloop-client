import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }


    return (
        <div className='pt-24 px-6'>
            <h2>apply for this job</h2>
        </div>
    );
};

export default ApplyPage;