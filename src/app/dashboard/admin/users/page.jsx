import AdminUsersTable from '@/Components/Dashboard/AdminUsersTable';
import { getUsersList } from '@/lib/api/users';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = data.users;

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-zinc-100">User Management</h1>
                <p className="text-sm text-zinc-500 mt-1">
                    Manage roles for everyone on Hireloop.
                </p>
            </div>
            <AdminUsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;