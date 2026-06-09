export default function StatsCard({ label, value, icon, trend, className = "" }) {
    return (
        <div
            className={`
        relative flex flex-col justify-between gap-6
        rounded-2xl border border-white/6
        bg-[#111318] px-5 py-5
        transition-all duration-200
        hover:border-white/12 hover:bg-[#15181f]
        ${className}
      `}
        >
            {/* Icon pill */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-slate-300">
                {icon}
            </div>

            {/* Bottom row: label + value */}
            <div>
                <p className="text-[13px] font-medium text-slate-400">{label}</p>
                <div className="mt-1 flex items-end gap-2">
                    <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
                        {typeof value === "number" ? value.toLocaleString() : value}
                    </span>

                    {/* Optional trend badge */}
                    {trend && (
                        <span
                            className={`mb-0.5 text-[11px] font-medium ${trend.positive ? "text-emerald-400" : "text-red-400"
                                }`}
                        >
                            {trend.value}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}