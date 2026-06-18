'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
// import { updateCompany } from '@/lib/actions/companies';

const CompanyTable = ({ companies = [] }) => {

    // const handleApprove = async (id) => {
    //     const result = await updateCompany(id, { status: 'Approved' })
    //     if (result.modifiedCount) {
    //         console.log(`Approved company with ID: ${id}`, result);
    //     }
    // };

    // const handleReject = async (id) => {
    //     const result = await updateCompany(id, { status: 'Rejected' })
    // };

    // Helper to extract a timestamp/date value safely from your data variations
    const getCompanyDate = (company) => {
        const dateVal = company.createdAt?.$date || company.createdAt || company.createAt?.$date || company.createAt;
        return dateVal ? new Date(dateVal).getTime() : 0;
    };

    // Sort companies: Newest First (descending order)
    const sortedCompanies = [...companies].sort((a, b) => getCompanyDate(b) - getCompanyDate(a));

    // Helper to format date cleanly like "Oct 12, 2023"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Status mapping for visual styling with explicit color values
    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return {
                    textColor: 'text-[#10b981]', // emerald-500
                    dotColor: '#10b981',
                    label: 'Approved'
                };
            case 'rejected':
                return {
                    textColor: 'text-[#f43f5e]', // rose-500
                    dotColor: '#f43f5e',
                    label: 'Rejected'
                };
            case 'pending':
            default:
                return {
                    textColor: 'text-[#f59e0b]', // amber-500
                    dotColor: '#f59e0b',
                    label: 'Pending'
                };
        }
    };

    // Helper to generate initials for the placeholder icon
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'CO';
    };

    return (
        <div className="w-full bg-[#121214] text-[#e5e5e5]  rounded-lg">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company approval management table">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626]">
                                Company Name
                            </Table.Column>

                            <Table.Column className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626]">
                                Recruiter Email
                            </Table.Column>

                            <Table.Column className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626]">
                                Industry
                            </Table.Column>

                            <Table.Column className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626]">
                                Status
                            </Table.Column>

                            <Table.Column className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626]">
                                Date Submitted
                            </Table.Column>

                            <Table.Column className="text-[#a3a3a3] font-medium pb-4 border-b border-[#262626] text-center">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {sortedCompanies.map((company) => {
                                const companyId = company._id?.$oid || company._id;
                                const statusInfo = getStatusDetails(company.status);

                                return (
                                    <Table.Row key={companyId} className="border-b border-[#262626]/60 hover:bg-[#1e1e22]/40 transition-colors">
                                        {/* Company Avatar & Name */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 p-4 flex items-center justify-center bg-[#262626] text-[#d4d4d4] rounded font-semibold text-sm tracking-wider border border-[#404040]/30">
                                                    {getInitials(company.name)}
                                                </div>
                                                <span className="font-medium text-[#e5e5e5]">{company.name}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Recruiter Email Placeholder */}
                                        <Table.Cell className="py-4 align-middle text-[#a3a3a3]">
                                            {company.recruiterEmail || `recruiter@${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                                        </Table.Cell>

                                        {/* Industry Pill */}
                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-[#262626]/60 text-[#a3a3a3] border border-[#404040]/20 rounded-full text-xs capitalize">
                                                {company.industry}
                                            </span>
                                        </Table.Cell>

                                        {/* Status Dot with explicit Style configuration */}
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="flex items-center gap-2">
                                                <CircleArrowDownFill
                                                    className="w-3 h-3"
                                                    style={{ color: statusInfo.dotColor }}
                                                />
                                                <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Date Submitted */}
                                        <Table.Cell className="py-4 align-middle text-[#a3a3a3]">
                                            {formatDate(
                                                company.createdAt?.$date ||
                                                company.createdAt ||
                                                company.createAt?.$date ||
                                                company.createAt
                                            )}
                                        </Table.Cell>

                                        {/* Actions Panel with standard style color injection */}
                                        <Table.Cell className="py-4 align-middle text-center">
                                            <div className="flex justify-center gap-2">
                                                {company.status?.toLowerCase() !== 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleApprove(companyId)}
                                                        className="rounded px-3 py-1 text-xs font-medium transition-colors"
                                                        style={{
                                                            backgroundColor: 'rgba(6, 78, 59, 0.3)', // bg-emerald-950/30
                                                            color: '#10b981', // text-emerald-500
                                                            borderColor: 'rgba(4, 120, 87, 0.4)' // border-emerald-700/40
                                                        }}
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                {company.status?.toLowerCase() !== 'rejected' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        onClick={() => handleReject(companyId)}
                                                        className="rounded px-3 py-1 text-xs font-medium transition-colors"
                                                        style={{
                                                            backgroundColor: 'rgba(136, 19, 55, 0.2)', // bg-rose-950/20
                                                            color: '#f43f5e', // text-rose-500
                                                            borderColor: 'rgba(190, 24, 74, 0.3)' // border-rose-700/30
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default CompanyTable;