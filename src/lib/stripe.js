import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TicHO0LzoQo8MDfdmIahSD6',
    'seeker_premium': 'price_1Ticun0LzoQo8MDflXlWi2Cv',
    'recruiter_growth': 'price_1TicwC0LzoQo8MDfGIXNbj8m',
    'recruiter_enterprise': 'price_1Ticxa0LzoQo8MDfuKTVWVNn',
}