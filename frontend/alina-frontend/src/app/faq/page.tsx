'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All Questions', icon: '📚' },
    { id: 'buyers', label: 'For Buyers', icon: '🛒' },
    { id: 'sellers', label: 'For Sellers', icon: '💼' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  const faqs: FAQItem[] = [
    // Buyers
    {
      category: 'buyers',
      question: 'How do I find the right freelancer for my project?',
      answer: 'Use our advanced search and filtering system to find freelancers by category, skills, rating, price range, and delivery time. Read reviews, check portfolios, and message sellers before placing an order to ensure they\'re the right fit.',
    },
    {
      category: 'buyers',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
    },
    {
      category: 'buyers',
      question: 'How does the escrow system work?',
      answer: 'When you place an order, your payment is held securely in escrow. The seller only receives payment after you approve the delivered work. This protects both parties and ensures quality delivery.',
    },
    {
      category: 'buyers',
      question: 'What if I\'m not satisfied with the work delivered?',
      answer: 'If the delivered work doesn\'t meet your requirements, you can request revisions (included in most packages). If the issue persists, contact our support team within 14 days to initiate a dispute. We\'ll mediate and may issue a refund if warranted.',
    },
    {
      category: 'buyers',
      question: 'Can I cancel an order after placing it?',
      answer: 'You can cancel before the seller starts work. Once work has begun, cancellation requires mutual agreement or our support team\'s approval. Frequent cancellations may affect your account standing.',
    },

    // Sellers
    {
      category: 'sellers',
      question: 'How much does it cost to sell on Alina?',
      answer: 'Creating a seller account is completely free. We charge a 10% commission on completed orders - significantly lower than the industry average of 20-25%. There are no listing fees or monthly subscriptions.',
    },
    {
      category: 'sellers',
      question: 'How do I create an effective gig listing?',
      answer: 'Use a clear, descriptive title, upload high-quality images showcasing your work, write a detailed description including deliverables, and offer competitive pricing with different package tiers. Check our Seller Guide for best practices.',
    },
    {
      category: 'sellers',
      question: 'When do I receive payment for completed orders?',
      answer: 'Funds are released to your account 3-5 business days after the buyer approves your delivery. You can then withdraw to your bank account or PayPal (processing takes 1-3 business days).',
    },
    {
      category: 'sellers',
      question: 'How can I improve my seller rating?',
      answer: 'Deliver high-quality work on time, communicate promptly and professionally, exceed client expectations, offer revisions when needed, and maintain a portfolio showcasing your best work. Positive reviews directly impact your visibility.',
    },
    {
      category: 'sellers',
      question: 'What happens if a buyer requests a refund?',
      answer: 'If a dispute arises, our support team reviews the case including work delivered, communication logs, and both parties\' evidence. Refunds are issued only if the delivered work significantly doesn\'t match the gig description or requirements.',
    },

    // Payments
    {
      category: 'payments',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. Buyers pay the listed price plus payment processing fees (if applicable). Sellers pay a 10% commission on completed orders. All fees are clearly displayed before checkout.',
    },
    {
      category: 'payments',
      question: 'How do I withdraw my earnings?',
      answer: 'Go to your Wallet, click "Withdraw", select your preferred method (bank transfer, PayPal, Wire), enter the amount, and confirm. Minimum withdrawal is $10. Processing times: PayPal (1-2 days), Bank transfer (3-5 days), Wire (5-7 days).',
    },
    {
      category: 'payments',
      question: 'What currencies do you support?',
      answer: 'All transactions are processed in USD. If your local currency is different, your bank or payment provider will handle the conversion at their exchange rate.',
    },
    {
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and PCI DSS compliant payment processors. We never store your full credit card details on our servers. All payment data is tokenized and encrypted.',
    },
    {
      category: 'payments',
      question: 'Can I get an invoice for my purchase?',
      answer: 'Yes, invoices are automatically generated for all orders and can be downloaded from your Order History page. They include all transaction details, taxes, and payment breakdown.',
    },

    // Account
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign Up", enter your email and password, verify your email address, and complete your profile. You can also sign up using Google for faster registration. It\'s completely free to join.',
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link. Follow the link to create a new password. If you don\'t receive the email, check your spam folder or contact support.',
    },
    {
      category: 'account',
      question: 'Can I have both a buyer and seller account?',
      answer: 'Yes! Every account can both buy and sell services. You can easily switch between buyer and seller views from your dashboard. No need for separate accounts.',
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. You\'ll need to complete any active orders first and withdraw your balance. Account deletion is permanent and cannot be undone. We\'ll retain transaction records for legal compliance.',
    },
    {
      category: 'account',
      question: 'Can I change my username?',
      answer: 'Usernames can be changed once every 30 days. Go to Settings > Profile > Edit Username. Note that your profile URL will also change, which may affect your branding.',
    },

    // Security
    {
      category: 'security',
      question: 'How do you protect my personal information?',
      answer: 'We use SSL/TLS encryption, secure HTTP-only cookies, regular security audits, and comply with GDPR and data protection laws. See our Privacy Policy for full details on how we handle your data.',
    },
    {
      category: 'security',
      question: 'What is two-factor authentication (2FA)?',
      answer: 'account security by requiring a code from your phone in addition to your password when logging in. We highly recommend enabling 2FA in Settings > Security.',
    },
    {
      category: 'security',
      question: 'How do I report suspicious activity or scams?',
      answer: 'Click the "Report" button on any user profile or gig listing. For urgent security concerns, email security@alina.com or use our 24/7 live chat. We investigate all reports and take action against violators.',
    },
    {
      category: 'security',
      question: 'What information should I never share?',
      answer: 'Never share your password, credit card details, or bank information outside the platform. Never accept requests to communicate or pay off-platform. Legitimate sellers and support staff will never ask for sensitive information.',
    },
    {
      category: 'security',
      question: 'Is it safe to share my contact information with sellers?',
      answer: 'We recommend keeping all communication on-platform for your protection. Our messaging system is secure and provides a record for dispute resolution. Sharing external contact info risks losing transaction protection.',
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <span className="text-2xl mr-2">❓</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about using Alina
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-lg"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-gray-200/60">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl font-semibold text-gray-900 mb-2">No results found</p>
                <p className="text-gray-600">Try adjusting your search or browse all categories</p>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Still Need Help */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200/60 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Contact Support
              </Link>
              <a
                href="mailto:support@alina.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all border-2 border-gray-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us
              </a>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/terms"
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Terms of Service
              </h3>
              <p className="text-sm text-gray-600">
                Read our terms and conditions
              </p>
            </Link>
            <Link
              href="/privacy"
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600">
                Learn how we protect your data
              </p>
            </Link>
            <Link
              href="/marketplace"
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Browse Services
              </h3>
              <p className="text-sm text-gray-600">
                Find services from top freelancers
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
