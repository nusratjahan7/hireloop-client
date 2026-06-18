"use client";
import { useState } from "react";
import { Table, Chip, Button, AlertDialog, useOverlayState } from "@heroui/react";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/actions/user";

const roleConfig = {
    seeker: { label: "Seeker", color: "default" },
    recruiter: { label: "Recruiter", color: "primary" },
    admin: { label: "Admin", color: "success" },
};

const avatarPalette = [
    "bg-violet-500/15 text-violet-300",
    "bg-rose-500/15 text-rose-300",
    "bg-teal-500/15 text-teal-300",
    "bg-amber-500/15 text-amber-300",
    "bg-emerald-500/15 text-emerald-300",
    "bg-sky-500/15 text-sky-300",
];

const getInitials = (name = "") =>
    name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const getAvatarColor = (name = "") =>
    avatarPalette[name.charCodeAt(0) % avatarPalette.length];

export default function AdminUsersTable({ users = [] }) {
    const [pendingId, setPendingId] = useState(null);
    const [pendingAction, setPendingAction] = useState(null); // { userId, userName, role }


    const handleRoleChange = async (userId, role) => {
        setPendingId(userId);
        try {
            await updateUserRole(userId, role);
            toast.success(`User role updated to ${roleConfig[role].label}.`);
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setPendingId(null);
        }
    };

    const requestRoleChange = (userId, userName, role) => {
        setPendingAction({ userId, userName, role });
    };

    const confirmRoleChange = () => {
        if (!pendingAction) return;
        handleRoleChange(pendingAction.userId, pendingAction.role);
        setPendingAction(null);
    };


    const formattedUsers = users.map(user => {
        const parsedId = user.id?.$oid || user.id || user._id;
        return {
            ...user,
            stringId: String(parsedId)
        };
    });

    return (
        <>
            <Table aria-label="User management table">
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header>
                            <Table.Column isRowHeader>Name</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Role</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body items={formattedUsers}>
                            {(user) => {
                                const role = roleConfig[user.role] ?? roleConfig.seeker;
                                const isBusy = pendingId === user.stringId;

                                return (
                                    <Table.Row key={user.stringId}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center border justify-center text-xs font-semibold shrink-0 ${getAvatarColor(
                                                        user.name
                                                    )}`}
                                                >
                                                    {getInitials(user.name)}
                                                </div>
                                                <span className="text-sm text-zinc-200">{user.name}</span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-sm text-zinc-400">{user.email}</span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Chip color={role.color} size="sm" variant="soft">
                                                {role.label}
                                            </Chip>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    isDisabled={isBusy || user.role === "seeker"}
                                                    onPress={() => requestRoleChange(user.stringId, user.name, "seeker")}
                                                    className="h-7 px-3 rounded-lg text-xs font-medium border disabled:opacity-40 disabled:cursor-not-allowed"
                                                    style={{
                                                        borderColor: "#2563eb",
                                                        backgroundColor: "rgba(37,99,235,0.6)",
                                                        color: "#ffffff",
                                                    }}
                                                >
                                                    Make Seeker
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    isDisabled={isBusy || user.role === "recruiter"}
                                                    onPress={() => requestRoleChange(user.stringId, user.name, "recruiter")}
                                                    className="h-7 px-3 rounded-lg text-xs font-medium border border-sky-900 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Make Recruiter
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    isDisabled={isBusy || user.role === "admin"}
                                                    onPress={() => requestRoleChange(user.stringId, user.name, "admin")}
                                                    className="h-7 px-3 rounded-lg text-xs font-medium border border-emerald-800 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Make Admin
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer>
                    <span className="text-xs text-zinc-500">
                        {users.length} user{users.length === 1 ? "" : "s"}
                    </span>
                </Table.Footer>
            </Table>


            <AlertDialog
                isOpen={!!pendingAction}
                onOpenChange={(open) => {
                    if (!open) setPendingAction(null);
                }}
            >
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.Header>
                                <AlertDialog.Heading>Change user role</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                {pendingAction && (
                                    <p className="text-sm text-zinc-400">
                                        Change{" "}
                                        <span className="text-zinc-200 font-medium">{pendingAction.userName}</span>
                                        's role to{" "}
                                        <span className="text-zinc-200 font-medium">
                                            {roleConfig[pendingAction.role].label}
                                        </span>
                                        ?
                                    </p>
                                )}
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="bordered"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg h-9 px-4 text-sm"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={confirmRoleChange}
                                    color="primary"
                                    className="rounded-lg h-9 px-4 text-sm font-medium"
                                >
                                    Confirm
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
}