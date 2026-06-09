"use client"
import CompanyList from '@/Components/Dashboard/CompanyList';
import DashboardStats from '@/Components/Dashboard/DashboardStats';
import DataTable from '@/Components/Dashboard/DataTable';
import { authClient } from '@/lib/auth-client';
import { CheckCircle, FileText, Users, Zap, Building2, Cpu, Box, } from 'lucide-react';


const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = authClient.useSession();


    if (isPending) {
        return <div>loading...</div>
    }

    const user = session?.user;

    const recruiterStats = [
        { id: 1, label: "Total Job Posts", value: 48, icon: <FileText size={18} /> },
        { id: 2, label: "Total Applicants", value: 1284, icon: <Users size={18} /> },
        { id: 3, label: "Active Jobs", value: 18, icon: <Zap size={18} /> },
        { id: 4, label: "Jobs Closed", value: 32, icon: <CheckCircle size={18} /> },
    ];

    const applications = [
        {
            id: 1,
            name: "Julianne Moore",
            role: "Senior Product Designer",
            date: "Oct 24, 2023",
            experience: "6 years",
            status: "Interviewing",
        },
        {
            id: 2,
            name: "Robert Downey",
            role: "Backend Engineer",
            date: "Oct 23, 2023",
            experience: "4 years",
            status: "New",
        },
        {
            id: 3,
            name: "Emma Stone",
            role: "Marketing Lead",
            date: "Oct 22, 2023",
            experience: "8 years",
            status: "Reviewing",
        },
        {
            id: 4,
            name: "Chris Pratt",
            role: "Product Manager",
            date: "Oct 21, 2023",
            experience: "5 years",
            status: "Rejected",
        },
    ];

    const companies = [
        {
            id: 1,
            name: "Google Inc.",
            description: "Technology • Mountain View",
            jobs: 24,
            logo: <Cpu size={18} />,
        },
        {
            id: 2,
            name: "Meta Platforms",
            description: "Social Media • Menlo Park",
            jobs: 18,
            logo: <Building2 size={18} />,
        },
        {
            id: 3,
            name: "Stripe",
            description: "Fintech • San Francisco",
            jobs: 12,
            logo: <Box size={18} />,
        },
        {
            id: 4,
            name: "Tesla",
            description: "Automotive • Austin",
            jobs: 31,
            logo: <Zap size={18} />,
        },
    ];

    return (
        <div className='p-4 space-y-4'>
            <h2 className='text-2xl font-bold'>Welcome back, {user?.name}</h2>

            <DashboardStats stats={recruiterStats} />

            <div className="grid lg:grid-cols-[2fr_1fr] gap-2">
                <DataTable
                    title="Recent Applications"
                    actionText="View All"
                    columns={[
                        "Candidate Name",
                        "Role",
                        "Date Applied",
                        "Experience",
                        "Status",
                    ]}
                    data={applications}
                />

                <CompanyList
                    title="My Top Companies"
                    actionText="View All"
                    companies={companies}
                />
            </div>

        </div>
    );
};

export default RecruiterDashboardHomePage;