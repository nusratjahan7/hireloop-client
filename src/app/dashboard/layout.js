import { DashboardSidebar } from "@/Components/Dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className='pt-20 flex min-h-screen bg-[#2222]'>
            <DashboardSidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;