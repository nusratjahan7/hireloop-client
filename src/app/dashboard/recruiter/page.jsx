"use client"
import DashboardStats from '@/Components/Dashboard/DashboardStats';
import { authClient } from '@/lib/auth-client';
import { CheckCircle, FileText, Users, Zap } from 'lucide-react';


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


    return (
        <div className='p-4 space-y-4'>
            <h2 className='text-2xl font-bold'>Welcome back, {user?.name}</h2>

            <DashboardStats stats={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;