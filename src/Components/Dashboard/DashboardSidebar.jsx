
import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Envelope, Gear, House, Magnifier, Person, Plus, Factory, Bookmark, FileText, CreditCard, Briefcase } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { LayoutDashboard, LayoutGrid, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();

    const recruiterNavLinks = [
        { icon: House, label: "Home", href: "/dashboard/recruiter" },
        { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
        { icon: Plus, label: "Create A Job", href: "/dashboard/recruiter/jobs/new" },
        { icon: Envelope, label: "Messages", href: "/dashboard/recruiter/messages" },
        { icon: Person, label: "Profile", href: "/dashboard/recruiter/profile" },
        { icon: Factory, label: "Company Profile", href: "/dashboard/recruiter/company" },
        { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
    ]

    const seekerNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/jobseeker" },
        { icon: Magnifier, label: "Jobs", href: "/dashboard/seeker/jobs" },
        { icon: Bookmark, label: "Saved Jobs", href: "/dashboard/seeker/saved-jobs" },
        { icon: FileText, label: "Applications", href: "/dashboard/seeker/applications" },
        { icon: CreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
        { icon: Gear, label: "Settings", href: "/dashboard/seeker/settings" },
    ];

    const adminNavLinks = [
        { icon: LayoutGrid, label: "Dashboard", href: "/dashboard/admin" },
        { icon: Users, label: "Users", href: "/dashboard/admin/users" },
        { icon: Factory, label: "Companies", href: "/dashboard/admin/companies" },
        { icon: Briefcase, label: "Jobs", href: "/dashboard/admin/jobs" },
        { icon: CreditCard, label: "Payments", href: "/dashboard/admin/payments" },
        { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
    ]

    const navLinksMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks,
    }

    const navItems = navLinksMap[user.role || 'seeker'];


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>



            <Drawer>
                <Button className="lg:hidden mt-5 sticky top-24" variant="ghost">
                    <LayoutSideContentLeft className="h-5 w-5" />
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}