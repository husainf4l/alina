import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Alina',
  description: 'Learn how Alina collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'March 1, 2026';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-8">
            <p className="text-gray-700 leading-relaxed">
              At Alina, we take your privacy seriously. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Account Information:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, phone number</li>
                    <li>Profile photo and bio</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                    <li>Business/tax information for sellers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Usage Data:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address, browser type, device information</li>
                    <li>Pages visited, time spent, clickstream data</li>
                    <li>Search queries and browsing history</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transaction Data:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Order details, pricing, delivery information</li>
                    <li>Messages between buyers and sellers</li>
                    <li>Reviews, ratings, and feedback</li>
                    <li>Dispute and support communications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process transactions and payments</li>
                <li>Send order confirmations and updates</li>
                <li>Communicate with you about your account</li>
                <li>Personalize your experience and recommendations</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Analyze usage patterns and optimize performance</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Other Users:</strong> Your public profile information is visible to all users</li>
                <li><strong>Service Providers:</strong> Payment processors, hosting providers, analytics services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
              </ul>
              <p className="text-gray-700 mt-4">We never sell your personal information to third parties.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 mb-4">We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure HTTP-only cookies for authentication</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and employee training</li>
                <li>Encrypted storage of sensitive data</li>
                <li>Two-factor authentication options</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to processing of your data</li>
              </ul>
              <p className="text-gray-700 mt-4">Contact privacy@alina.com to exercise these rights.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-700 mb-4">We use cookies for:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Authentication and session management</li>
                <li>Personalization and preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Advertising and marketing</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can manage cookie preferences through your browser settings. See our{' '}
                <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> for details.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Account data is deleted within 90 days of account closure, except for transaction records required for tax/legal purposes (retained for 7 years).
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. International Transfers
              </h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. We ensure adequate protection through standard contractual clauses and compliance with applicable data protection laws.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700">
                Our platform is not intended for users under 18. We do not knowingly collect information from children. If you believe we have collected data from a minor, please contact us immediately.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification. Your continued use after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                For privacy-related questions or concerns:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@alina.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@alina.com</p>
                <p><strong>Support:</strong> Available 24/7 through the platform</p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200/60">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/terms" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group">
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Terms of Service</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/cookies" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group">
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Cookie Policy</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/faq" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group">
                <span className="font-medium text-gray-700 group-hover:text-purple-600">FAQ</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/support" className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group">
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Contact Support</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
