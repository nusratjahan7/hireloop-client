
import { LayoutSideContentLeft, Envelope, Gear, House, Magnifier, Person, Plus, Factory } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, label: "Home", href: "/dashboard/recruiter" },
        { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
        { icon: Plus, label: "Create A Job", href: "/dashboard/recruiter/jobs/new" },
        { icon: Envelope, label: "Messages", href: "/dashboard/recruiter/messages" },
        { icon: Person, label: "Profile", href: "/dashboard/recruiter/profile" },
        { icon: Factory, label: "Company Profile", href: "/dashboard/recruiter/company" },
        { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
    ];

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