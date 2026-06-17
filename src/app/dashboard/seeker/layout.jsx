import { requireRole } from "@/lib/core/session";

const seekerLayout = async ({ children }) => {
    await requireRole('seeker');
    return children;
};

export default seekerLayout;