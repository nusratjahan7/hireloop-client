import CompaniesTable from '@/Components/Companies/CompaniesTable';
import { getCompanies } from '@/lib/api/companies';

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();

    return (
        <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-zinc-100">Company Approvals</h1>
                <p className="text-sm text-zinc-500 mt-1">
                    Review and approve company registrations on Hireloop.
                </p>
            </div>
            <CompaniesTable companies={companies} />
        </div>
    );
};

export default AdminCompaniesPage;