import React from 'react';
import CompanyProfilePage from './CompanyProfilePage';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {
    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);

    return (
        <div>
            <CompanyProfilePage recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;