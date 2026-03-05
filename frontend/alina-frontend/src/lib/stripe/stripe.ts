// Stripe Configuration and Utilities
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Load Stripe instance (singleton pattern)
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.warn('Stripe publishable key not configured');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Check if Stripe is enabled
export const isStripeEnabled = () => {
  return !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};

// Format amount for Stripe (convert dollars to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Format amount from Stripe (convert cents to dollars)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};
