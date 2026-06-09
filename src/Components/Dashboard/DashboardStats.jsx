import StatsCard from "./StatsCard";

export default function DashboardStats({ stats = [], cols }) {

    const colClass = cols
        ? `grid-cols-${cols}`
        : stats.length <= 2
            ? "grid-cols-1 sm:grid-cols-2"
            : stats.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

    if (!stats.length) return null;

    return (
        <div className={`grid gap-4 ${colClass}`}>
            {stats.map((stat) => (
                <StatsCard
                    key={stat.id}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    trend={stat.trend}
                />
            ))}
        </div>
    );
}