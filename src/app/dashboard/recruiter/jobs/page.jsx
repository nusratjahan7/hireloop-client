import { getCompanyJobs } from '@/lib/api/jobs';
import { Chip, Table, Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const statusColorMap = {
    active: "success",
    inactive: "danger",
    draft: "warning",
    closed: "default",
};

const RecruiterJobs = async () => {
    const companyId = 'company_123'; // todo
    const jobs = await getCompanyJobs(companyId);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
            <Table>
                <Table.ResizableContainer>
                    <Table.Content aria-label="Company job listings" className="min-w-175">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="1.5fr" id="jobTitle" minWidth={180}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="jobType" minWidth={120}>
                                Type
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                                Deadline
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="salary" minWidth={160}>
                                Salary Range
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="0.8fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="0.8fr" id="actions" minWidth={120}>
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {jobs.map((job) => (
                                <Table.Row key={job._id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-medium text-sm">{job.jobTitle}</p>
                                            <p className="text-xs text-gray-400 capitalize">{job.jobCategory}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="capitalize text-sm">{job.jobType}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm">
                                            {new Date(job.deadline).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm">
                                            {job.minSalary} – {job.maxSalary}{' '}
                                            <span className="uppercase text-default-400 text-xs">{job.currency}</span>
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            color={statusColorMap[job.status] ?? "default"}
                                            size="sm"
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {job.status}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-1">
                                            <Tooltip content="View details">
                                                <Button isIconOnly size="sm" variant="light" aria-label="View job">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit job">
                                                <Button isIconOnly size="sm" variant="light" aria-label="Edit job">
                                                    <Pencil className="w-4 h-4 text-blue-400" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete job" color="danger">
                                                <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete job">
                                                    <TrashBin className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;