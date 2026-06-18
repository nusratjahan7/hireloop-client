import { getUsersList } from '@/lib/api/users';
import React from 'react';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = data.users;

    return (
        <div>
            <h2>Users: {users.length}</h2>
        </div>
    );
};

export default AdminUsersPage;