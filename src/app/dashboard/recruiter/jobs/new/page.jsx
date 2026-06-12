import React from 'react';
import NewJobForm from './NewJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const NewJobPage = async () => {

    // const user = await getUserSession();
    // const company = await getRecruiterCompany(user?.id);

    const company = await getLoggedInRecruiterCompany();

    return (
        <div>
            <NewJobForm company={company} />
        </div>
    );
};

export default NewJobPage;