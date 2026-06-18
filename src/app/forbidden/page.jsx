'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ForbiddenPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-6 text-center select-none">
            {/* Glow / Ambient background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-950/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full z-10 space-y-6">
                {/* Visual Accent Warning Indicator */}
                <div className="mx-auto w-20 h-20 bg-rose-950/20 border border-rose-900/30 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                        className="w-10 h-10 text-[#f43f5e]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* HTTP Status Code */}
                <h1 className="text-8xl font-extrabold tracking-widest text-[#262626] font-mono">
                    403
                </h1>

                {/* Message Header */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#e5e5e5] tracking-tight">
                        Access Forbidden
                    </h2>
                    <p className="text-sm text-[#a3a3a3] max-w-sm mx-auto leading-relaxed">
                        You do not have administrative privileges to view this section. Please contact your manager if you believe this is an error.
                    </p>
                </div>

                {/* Action Controls */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-5 py-2.5 rounded text-xs font-medium transition-colors border border-[#404040]/40 text-[#e5e5e5] bg-[#121214] hover:bg-[#1e1e22]/80"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full sm:w-auto px-5 py-2.5 rounded text-xs font-medium transition-colors"
                        style={{
                            backgroundColor: 'rgba(136, 19, 55, 0.2)', // bg-rose-950/20
                            color: '#f43f5e',                         // text-rose-500
                            borderColor: 'rgba(190, 24, 74, 0.3)',    // border-rose-700/30
                            borderWidth: '1px'
                        }}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;