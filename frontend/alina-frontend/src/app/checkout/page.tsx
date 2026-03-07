'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getErrorMessage, logError } from '@/lib/utils/errors';
import { useToast } from '@/contexts/ToastContext';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gigId = searchParams.get('gigId');
  const packageType = searchParams.get('package') || 'standard';
  const toast = useToast();

  const [formData, setFormData] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    saveCard: false,
    billingAddress: '',
    billingCity: '',
    billingCountry: '',
    billingZip: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Mock gig data
  const gig = {
    id: gigId,
    title: 'Professional Logo Design',
    seller: { name: 'Jane Designer', avatar: '' },
    image: 'https://via.placeholder.com/400x300',
    packages: {
      basic: { price: 50, delivery: 3, revisions: 2, features: ['1 Logo Concept', 'Source Files'] },
      standard: { price: 100, delivery: 5, revisions: 3, features: ['3 Logo Concepts', 'Source Files', 'Social Media Kit'] },
      premium: { price: 200, delivery: 7, revisions: 5, features: ['5 Logo Concepts', 'Source Files', 'Social Media Kit', 'Brand Guidelines'] },
    },
  };

  const selectedPackage = gig.packages[packageType as keyof typeof gig.packages];
  const subtotal = selectedPackage.price;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Process payment based on selected method
      if (formData.paymentMethod === 'card') {
        // Import payment service dynamically
        const { stripePaymentService } = await import('@/lib/api/services/payment.service');
        
        // For real Stripe integration, you would:
        // 1. Create a PaymentIntent
        // 2. Use Stripe Elements to collect card details securely
        // 3. Confirm the payment
        // For now, we'll call the backend to process
        await stripePaymentService.processPayment({
          gigId: gigId || '',
          packageType,
          amount: total,
          paymentMethodId: 'pm_card_visa', // This would come from Stripe Elements
          saveCard: formData.saveCard,
        });
      } else if (formData.paymentMethod === 'wallet') {
        // Process wallet payment
        const { apiClient } = await import('@/lib/api/axios-config');
        await apiClient.post('/payments/wallet', {
          gigId,
          packageType,
          amount: total,
        });
      } else if (formData.paymentMethod === 'paypal') {
        // Redirect to PayPal
        toast.info('PayPal integration coming soon!');
        setIsProcessing(false);
        return;
      }
      
      toast.success('Payment processed successfully!');
      router.push('/orders?status=success');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      logError(error, { action: 'checkout', gigId, packageType, paymentMethod: formData.paymentMethod });
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href={`/gigs/${gigId}`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Gig
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
              <p className="text-gray-600 dark:text-gray-400">Complete your purchase</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                    
                    <div className="space-y-4 mb-6">
                      <label className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5"
                        />
                        <div className="flex items-center gap-3">
                          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-gray-900 dark:text-white">Credit/Debit Card</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5"
                        />
                        <div className="flex items-center gap-3">
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00457C">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.633h5.404c1.66 0 3.275.34 4.693 1.044 1.347.667 2.42 1.647 3.004 2.947.584 1.3.584 2.84 0 4.14-.584 1.3-1.657 2.28-3.004 2.947-1.418.704-3.033 1.044-4.693 1.044H8.145l-.69 4.127a.77.77 0 0 1-.759.633z" />
                          </svg>
                          <span className="font-semibold text-gray-900 dark:text-white">PayPal</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wallet"
                          checked={formData.paymentMethod === 'wallet'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-5 h-5"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">Wallet Balance</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Available: $5,420.00</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Card Details (only show if card selected) */}
                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.cardCvv}
                              onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                              placeholder="123"
                              maxLength={4}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Cardholder Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.saveCard}
                            onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Save card for future purchases</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Billing Address */}
                  {formData.paymentMethod === 'card' && (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Billing Address</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.billingAddress}
                            onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                            placeholder="123 Main St"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.billingCity}
                              onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={formData.billingCountry}
                              onChange={(e) => setFormData({ ...formData, billingCountry: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select</option>
                              <option value="US">United States</option>
                              <option value="UK">United Kingdom</option>
                              <option value="CA">Canada</option>
                              <option value="AU">Australia</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.billingZip}
                              onChange={(e) => setFormData({ ...formData, billingZip: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" disabled={isProcessing} className="w-full py-4 text-lg">
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      `Pay $${Number(total || 0).toFixed(2)}`
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                    By clicking "Pay", you agree to our Terms of Service and acknowledge our Privacy Policy
                  </p>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                  
                  {/* Gig Preview */}
                  <div className="mb-6">
                    <img src={gig.image} alt={gig.title} className="w-full h-40 object-cover rounded-xl mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{gig.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {gig.seller.name}</p>
                  </div>

                  {/* Package Details */}
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{packageType} Package</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">${selectedPackage.price}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {selectedPackage.delivery} days delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {selectedPackage.revisions} revisions
                      </li>
                      {selectedPackage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>${Number(subtotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Service Fee (5%)</span>
                      <span>${Number(serviceFee || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-green-900 dark:text-green-100">Secure Payment</p>
                      <p className="text-xs text-green-700 dark:text-green-300">Your payment info is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
