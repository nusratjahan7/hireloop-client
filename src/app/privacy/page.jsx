import Link from "next/link";

const sections = [
    {
        title: "1. Information We Collect",
        content: `We collect information you provide directly to us when you create an account, post a job, or apply for a position. This includes your name, email address, phone number, resume, company name, and any other information you choose to provide. We also collect data automatically when you use Hireloop, such as your IP address, browser type, device information, and pages visited.`,
    },
    {
        title: "2. How We Use Your Information",
        content: `We use the information we collect to operate and improve Hireloop, personalize your experience, match job seekers with relevant opportunities, send transactional emails such as job alerts and application updates, and respond to your support requests. We do not use your data for any purpose beyond operating the Hireloop platform.`,
    },
    {
        title: "3. Information Sharing",
        content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating the platform, such as cloud hosting and email delivery services. These providers are contractually obligated to keep your information confidential and may not use it for any other purpose.`,
    },
    {
        title: "4. Job Applications & Recruiter Access",
        content: `When you apply for a job on Hireloop, your application details including your resume and contact information are shared with the recruiter who posted that job. By submitting an application, you consent to this sharing. Recruiters are bound by our platform guidelines and may not use your data outside of the hiring process.`,
    },
    {
        title: "5. Data Storage & Security",
        content: `Your data is stored on secure servers and we implement industry-standard security measures including encryption and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security. We encourage you to use a strong, unique password for your account.`,
    },
    {
        title: "6. Cookies & Tracking",
        content: `Hireloop uses cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze how the platform is used. You can control cookie settings through your browser. Disabling cookies may affect the functionality of certain features on the platform.`,
    },
    {
        title: "7. Your Rights",
        content: `You have the right to access, correct, or delete your personal data at any time. You may update your profile information directly from your account settings. To request permanent deletion of your account and associated data, please contact us at support@hireloop.com. We will process your request within 30 days.`,
    },
    {
        title: "8. Data Retention",
        content: `We retain your personal data for as long as your account is active or as needed to provide our services. If you delete your account, we will remove your personal data from our active systems within 30 days, though some information may remain in backups for a limited period as required by law.`,
    },
    {
        title: "9. Third-Party Links",
        content: `Hireloop may contain links to third-party websites such as company career pages or external resources. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    },
    {
        title: "10. Children's Privacy",
        content: `Hireloop is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will take steps to delete that information promptly.`,
    },
    {
        title: "11. Changes to This Policy",
        content: `We may update this Privacy Guideline from time to time. When we do, we will revise the date at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information. Continued use of Hireloop after changes are posted constitutes your acceptance of the updated policy.`,
    },
    {
        title: "12. Contact Us",
        content: `If you have any questions, concerns, or requests regarding this Privacy Guideline, please contact our team at support@hireloop.com. We are committed to resolving any privacy-related concerns promptly and transparently.`,
    },
];

const PrivacyPage = () => {
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
                        Privacy Guideline
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Last updated: June 2026
                    </p>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                        At Hireloop, your privacy matters. This guideline explains what data we collect,
                        how we use it, and the choices you have regarding your personal information.
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

            </div>
        </div>
    );
};

export default PrivacyPage;