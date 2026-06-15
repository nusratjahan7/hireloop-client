"use client";
import { useState } from "react";
import { Check, ChevronDown } from "@gravity-ui/icons";

const seekerPlans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Get started with the basics.",
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
        cta: "Get started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$19",
        period: "month",
        description: "For active job seekers.",
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
        cta: "Get Pro",
        highlighted: true,
    },
    {
        name: "Premium",
        price: "$39",
        period: "month",
        description: "Everything you need to land faster.",
        features: [
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
        cta: "Get Premium",
        highlighted: false,
    },
];

const recruiterPlans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for your first year of hiring.",
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
        ],
        cta: "Get started",
        highlighted: false,
    },
    {
        name: "Growth",
        price: "$49",
        period: "month",
        description: "Scale your hiring with confidence.",
        features: [
            "Up to 10 active job posts",
            "Applicant tracking",
            "Basic analytics",
            "Email support",
        ],
        cta: "Get Growth",
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "$149",
        period: "month",
        description: "Built for serious hiring teams.",
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured job listings",
            "Team collaboration",
            "Custom branding",
            "Priority support",
        ],
        cta: "Get Enterprise",
        highlighted: false,
    },
];

const faqs = [
    {
        q: "Can I cancel my plan at any time?",
        a: "Yes. You can cancel anytime from your account settings. Your plan stays active until the end of the billing period — no charges after that.",
    },
    {
        q: "Are refunds available?",
        a: "We offer a 7-day refund on first-time purchases if you haven't used the paid features. Reach out to support and we'll sort it out.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards via Stripe. Bank transfers are available for Enterprise plans.",
    },
    {
        q: "Can I switch plans later?",
        a: "Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
    },
    {
        q: "Is there a free trial for paid plans?",
        a: "We don't currently offer a free trial, but our Free plan gives you a solid feel for the platform before committing.",
    },
];

function PlanCard({ plan }) {
    return (
        <div
            style={plan.highlighted ? { backgroundColor: 'rgba(109, 79, 232, 0.2)', borderColor: 'rgba(124, 92, 245, 0.6)' } : {}}
            className={`relative flex flex-col rounded-2xl border p-6 gap-5 transition-all ${plan.highlighted
                ? "shadow-lg shadow-blue-900/20"
                : "bg-zinc-900 border-zinc-800"
                }`}
        >
            {plan.highlighted && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7c5cf5]/70 to-transparent rounded-t-2xl" />
                    <span style={{ position: 'absolute', top: '16px', right: '16px' }} className="text-xs font-semibold text-white bg-[#7c5cf5] border border-[#7c5cf5]/50 rounded-full px-3 py-0.5">
                        Popular
                    </span>
                </>
            )}

            <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                    {plan.name}
                </p>
                <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm mb-1.5">/{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mt-1.5">{plan.description}</p>
            </div>

            <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        {f}
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-2">
                <form action="/api/checkout_sessions" method="POST">
                    <section>
                        <button
                            className={`w-full h-11 rounded-xl text-sm font-medium transition-colors ${plan.highlighted
                                ? "bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white"
                                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                                }`}
                        >
                            {plan.cta}
                        </button>
                    </section>
                </form>
            </div>

        </div>
    );
}

function FaqItem({ faq }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-zinc-800 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 py-4 text-left"
            >
                <span className="text-sm font-medium text-zinc-200">{faq.q}</span>
                <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <p className="text-sm text-zinc-500 leading-relaxed pb-4">{faq.a}</p>
            )}
        </div>
    );
}

export default function PlansPage() {
    const [tab, setTab] = useState("seeker");
    const plans = tab === "seeker" ? seekerPlans : recruiterPlans;

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-12">

                {/* Header */}
                <div className="text-center flex flex-col items-center gap-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Simple, honest pricing
                    </h1>
                    <p className="text-zinc-400 text-base max-w-md">
                        No hidden fees. Pick the plan that fits where you are right now.
                    </p>

                    {/* Toggle */}
                    <div className="mt-2 flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 mb-4">
                        <button
                            onClick={() => setTab("seeker")}
                            className={`px-5 h-9 rounded-lg text-sm font-medium transition-colors ${tab === "seeker"
                                ? "bg-zinc-700 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setTab("recruiter")}
                            className={`px-5 h-9 rounded-lg text-sm font-medium transition-colors ${tab === "recruiter"
                                ? "bg-zinc-700 text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {plans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </div>

                {/* FAQ */}
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-semibold text-white">Common questions</h2>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6">
                        {faqs.map((faq) => (
                            <FaqItem key={faq.q} faq={faq} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}