import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';

const RecruiterJobs = async () => {
    const companyId = 'company_123'; // todo 
    const jobs = await getCompanyJobs(companyId);

    return (
        <div>
            <h2>recruiter all jobs</h2>
        </div>
    );
};

export default RecruiterJobs;