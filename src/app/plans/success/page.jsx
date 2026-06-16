import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const subInfo = {
            email: customerEmail,
            planId: metadata.planId
        }
        // update the user table about he new plan
        const result = await createSubscription(subInfo);



        return (
            <main className="min-h-screen bg-[#050816] flex items-center justify-center px-4 pt-20">
                {/* Background glow */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-100 h-100 bg-emerald-500/10 blur-[120px]" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="rounded-3xl border border-white/10 bg-[#10131d]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Payment Successful!
                        </h1>

                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            We appreciate your business! Your account features have
                            been provisioned and your plan is now active.
                        </p>

                        {/* Email Box */}
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left mb-6">
                            <p className="text-xs text-slate-500 mb-2">
                                Confirmation Email
                            </p>

                            <p className="text-sm text-white font-medium break-all">
                                {customerEmail}
                            </p>

                            <div className="mt-4 border-t border-white/10 pt-3">
                                <p className="text-xs text-slate-500 mt-4">
                                    Have billing questions or need custom
                                    configuration support?
                                </p>

                                <a
                                    href="mailto:orders@example.com"
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                    orders@example.com
                                </a>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
                            >
                                Go to Workspace Dashboard
                            </Link>

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition"
                            >
                                ← Return to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return null
}