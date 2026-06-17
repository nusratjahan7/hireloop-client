import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const Applications = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationsByApplicant(user.id);
    console.log(jobs)
    return (
        <div>
            app
        </div>
    );
};

export default Applications;