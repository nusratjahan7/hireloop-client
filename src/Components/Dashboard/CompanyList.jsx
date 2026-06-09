export default function CompanyList({
    title,
    actionText,
    companies,
}) {
    return (
        <div className="bg-[#111111] border border-zinc-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-white">
                    {title}
                </h2>

                <button className="text-sm text-gray-400 hover:text-white">
                    {actionText}
                </button>
            </div>

            <div className="space-y-5">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="flex items-center justify-between"
                    >
                        <div className="flex gap-3">
                            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                {company.logo}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-white">
                                    {company.name}
                                </h3>

                                <p className="text-xs text-gray-400">
                                    {company.description}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <h4 className="text-white font-semibold">
                                {company.jobs}
                            </h4>

                            <p className="text-[10px] text-gray-500 uppercase">
                                Active Jobs
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 border border-zinc-700 rounded-lg py-3 text-sm text-white hover:bg-zinc-800">
                View All Companies
            </button>
        </div>
    );
}