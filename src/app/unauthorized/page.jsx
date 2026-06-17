import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';

export default async function UnauthorizedPage() {
    const user = await getUserSession();
    const profileHref = user
        ? user.role === 'admin'
            ? '/dashboard/admin'
            : user.role === 'recruiter'
                ? '/dashboard/recruiter'
                : '/dashboard/seeker'
        : '/auth/signin';

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md text-center">
                {/* Visual Indicator / Shield Icon */}
                <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6"
                    style={{
                        backgroundColor: '#e2a3a3',
                        color: '#b40d0d'
                    }}
                >
                    <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Text Content */}
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    401 - Unauthorized
                </h1>
                <p className="mt-4 text-base text-gray-500">
                    Oops! You don&apos;t have permission to access this page. Please sign in with an authorized account or head back to the dashboard.
                </p>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/auth/signin"
                        className="inline-flex items-center justify-center rounded-md bg-[#7c5cf5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6d4fe8] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#7c5cf5] transition-colors"
                    >
                        Sign In
                    </Link>

                    <Link
                        href={profileHref}
                        className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#111827',
                            boxShadow: 'inset 0 0 0 1px #d1d5db',
                            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))'
                        }}
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {/* Support Help Link */}
                <div className="mt-4">
                    <Link
                        href="/support"
                        className="text-sm font-medium text-[#7c5cf5] hover:text-[#6d4fe8]"
                    >
                        Contact support if you think this is a mistake &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}