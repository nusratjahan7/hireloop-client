import { requireRole } from '@/lib/core/session';

const AdminDashboardLayout = async ({ children }) => {
    await requireRole('admin');
    return children;
};

export default AdminDashboardLayout;