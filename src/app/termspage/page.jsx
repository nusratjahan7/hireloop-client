import Link from "next/link";

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: `By accessing or using Hireloop, you agree to be bound by these Terms & Policy. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.`,
    },
    {
        title: "2. Use of the Platform",
        content: `Hireloop is a job platform connecting recruiters and job seekers. You agree to use the platform only for lawful purposes. You must not misuse the platform by posting false, misleading, or fraudulent job listings or applications. Any abuse may result in immediate account termination.`,
    },
    {
        title: "3. Account Responsibilities",
        content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. Hireloop is not liable for any loss or damage arising from your failure to protect your account information.`,
    },
    {
        title: "4. Privacy & Data Collection",
        content: `We collect information you provide when registering, posting jobs, or applying for positions. This includes your name, email address, company details, and resume data. We use this data solely to operate and improve the Hireloop platform. We do not sell your personal data to third parties.`,
    },
    {
        title: "5. Cookies",
        content: `Hireloop uses cookies to enhance your browsing experience, maintain session state, and analyze platform usage. By using Hireloop, you consent to our use of cookies. You may disable cookies in your browser settings, though some features may not function correctly as a result.`,
    },
    {
        title: "6. Recruiter Responsibilities",
        content: `Recruiters are responsible for ensuring job postings are accurate, legal, and compliant with applicable employment laws. Hireloop reserves the right to remove any job listing that violates our guidelines or applicable law without prior notice.`,
    },
    {
        title: "7. Intellectual Property",
        content: `All content on Hireloop, including the logo, design, and code, is the intellectual property of Hireloop. You may not reproduce, distribute, or create derivative works without explicit written permission from Hireloop.`,
    },
    {
        title: "8. Limitation of Liability",
        content: `Hireloop is provided on an "as is" basis. We make no warranties regarding the accuracy or reliability of job listings or user content. To the fullest extent permitted by law, Hireloop shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.`,
    },
    {
        title: "9. Termination",
        content: `We reserve the right to suspend or terminate your account at our sole discretion if you violate these terms. Upon termination, your right to use the platform ceases immediately. Provisions that by their nature should survive termination will remain in effect.`,
    },
    {
        title: "10. Contact Us",
        content: `If you have any questions about these Terms & Policy, please contact us at support@hireloop.com. We aim to respond to all inquiries within 2 business days.`,
    },
];

const TermsPage = () => {
    return (
        <div className="min-h-screen pt-24 bg-zinc-950 text-zinc-200">
            <div className="max-w-5xl mx-auto px-5 py-16 sm:py-24">

                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6 inline-block"
                    >
                        ← Back to Hireloop
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                        Terms & Policy
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Last updated: June 2026
                    </p>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                        Please read these terms carefully before using Hireloop. By accessing the platform,
                        you agree to the following terms and conditions.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-800 mb-12" />

                {/* Sections */}
                <div className="space-y-10">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">
                                {section.title}
                            </h2>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-16 border-t border-zinc-800 pt-8 text-center">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} Hireloop. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;