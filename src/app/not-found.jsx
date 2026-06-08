import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <main className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">

            {/* Background glow blobs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7c5cf5]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-[#7c5cf5]/5 rounded-full blur-[80px] pointer-events-none" />

            {/* 404 big text */}
            <h1 className="text-[120px] sm:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none">
                404
            </h1>

            {/* Content */}
            <div className="relative -mt-4 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-px bg-[#7c5cf5]" />
                    <span className="text-[#7c5cf5] text-xs font-semibold uppercase tracking-widest">
                        Page Not Found
                    </span>
                    <div className="w-8 h-px bg-[#7c5cf5]" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Looks like this page took a wrong turn
                </h2>

                <p className="text-gray-400 text-sm sm:text-base max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                    <Link
                        href="/"
                        className="px-6 py-2.5 bg-[#7c5cf5] hover:bg-[#6d4fe8] text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/browse-jobs"
                        className="px-6 py-2.5 border border-white/10 hover:border-white/25 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        Browse Jobs
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;