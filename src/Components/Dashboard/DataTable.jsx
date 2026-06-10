import Link from "next/link";

const statusStyles = {
    Interviewing: "bg-green-500/20 text-green-400",
    Reviewing: "bg-yellow-500/20 text-yellow-400",
    Rejected: "bg-red-500/20 text-red-400",
    New: "bg-gray-500/20 text-gray-300",
};

export default function DataTable({
    title,
    actionText,
    columns,
    data,
}) {
    return (
        <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white">
                    {title}
                </h2>

                <Link href="/dashboard/recruiter/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {actionText}
                </Link >
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto md:overflow-visible">
                <table className="w-full md:min-w-full">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-5 py-4 text-left text-xs font-medium text-gray-400 whitespace-nowrap"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors"
                            >
                                {/* Candidate Name */}
                                <td className="px-4 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-zinc-700 flex-shrink-0" />

                                        <span className="text-sm font-medium text-white">
                                            {item.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-5 py-5 text-sm text-gray-300 whitespace-nowrap">
                                    {item.role}
                                </td>

                                {/* Date */}
                                <td className="px-5 py-5 text-sm text-gray-300 whitespace-nowrap">
                                    {item.date}
                                </td>

                                {/* Experience */}
                                <td className="px-5 py-5 text-sm text-gray-300 whitespace-nowrap">
                                    {item.experience}
                                </td>

                                {/* Status */}
                                <td className="px-5 py-5 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status] ||
                                            "bg-gray-500/20 text-gray-300"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-10 text-center text-gray-400"
                                >
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}