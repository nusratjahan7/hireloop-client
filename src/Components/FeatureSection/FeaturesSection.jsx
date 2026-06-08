import {
    Search,
    TrendingUp,
    Building2,
    Bookmark,
    Zap,
    FileText,
    Layers,
    Rocket,
} from "lucide-react";

const features = [
    {
        icon: <Search className="w-4 h-4 text-[#b770d8]" />,
        title: "Smart Search",
        description: "Find your ideal job with advanced filters.",
    },
    {
        icon: <TrendingUp className="w-4 h-4 text-[#b770d8]" />,
        title: "Salary Insights",
        description: "Get real salary data to negotiate confidently.",
    },
    {
        icon: <Building2 className="w-4 h-4 text-[#b770d8]" />,
        title: "Top Companies",
        description: "Apply to vetted companies that are hiring.",
    },
    {
        icon: <Bookmark className="w-4 h-4 text-[#b770d8]" />,
        title: "Saved Jobs",
        description: "Manage apps & favorites on your dashboard.",
    },
    {
        icon: <Zap className="w-4 h-4 text-[#b770d8]" />,
        title: "One-Click Apply",
        description: "Simplify your job applications for an easier process.",
    },
    {
        icon: <FileText className="w-4 h-4 text-[#b770d8]" />,
        title: "Resume Builder",
        description: "Create professional resumes with modern templates.",
    },
    {
        icon: <Layers className="w-4 h-4 text-[#b770d8]" />,
        title: "Skill-Based Matching",
        description: "Discover jobs that match your skills and experience.",
    },
    {
        icon: <Rocket className="w-4 h-4 text-[#b770d8]" />,
        title: "Career Growth Resources",
        description: "Boost your career with quick interview tips.",
    },
];

const FeaturesSection = () => {
    return (
        <section className="bg-[#0f1117] py-20 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Label */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-5 h-px bg-[#7c5cf5]" />
                    <span className="text-white text-[11px] font-semibold uppercase tracking-[0.2em]">
                        Features Job
                    </span>
                    <div className="w-5 h-px bg-[#7c5cf5]" />
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white text-center leading-tight mb-10">
                    Everything you need <br /> to succeed
                </h2>

                {/* 4-col x 2-row grid with gaps */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex items-start gap-3 p-4 "
                        >
                            {/* Icon box — left side */}
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg  bg-gradient-to-t from-[#2a2a2aa1] via-[#111111] to-[#0a0a0a] border border-white/6 mt-0.5">
                                {feature.icon}
                            </div>

                            {/* Text — right side */}
                            <div className="flex flex-col gap-1 min-w-0">
                                <h3 className="text-white text-xs font-semibold leading-snug">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-[11px] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;