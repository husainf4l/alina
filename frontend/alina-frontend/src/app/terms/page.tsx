import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - Alina',
  description: 'Read Alina\'s Terms of Service to understand the rules and regulations governing your use of our platform.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'March 1, 2026';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              {[
                'Acceptance of Terms',
                'User Accounts',
                'Services Provided',
                'Buyer Obligations',
                'Seller Obligations',
                'Payment Terms',
                'Intellectual Property',
                'Prohibited Activities',
                'Dispute Resolution',
                'Limitation of Liability',
                'Termination',
                'Changes to Terms',
                'Contact Information',
              ].map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {index + 1}. {section}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-1" className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using Alina ("Platform", "Service", "we", "us", "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms constitute a legal agreement between you and Alina. Your use of the Platform signifies your acceptance of these Terms and our Privacy Policy.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-2" className="text-2xl font-semibold text-gray-900 mb-4">
                2. User Accounts
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of the Platform, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and account</li>
                <li>Promptly update account information to keep it accurate</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to create an account. Accounts are non-transferable.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-3" className="text-2xl font-semibold text-gray-900 mb-4">
                3. Services Provided
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Alina provides a marketplace platform connecting buyers and sellers of freelance services. We facilitate:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Service listings and discovery</li>
                <li>Secure payment processing through escrow</li>
                <li>Communication tools between users</li>
                <li>Order management and tracking</li>
                <li>Dispute resolution assistance</li>
                <li>Rating and review systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-4" className="text-2xl font-semibold text-gray-900 mb-4">
                4. Buyer Obligations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a buyer, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide clear and accurate project requirements</li>
                <li>Communicate respectfully with sellers</li>
                <li>Release payments promptly upon satisfactory delivery</li>
                <li>Not request services that violate these Terms</li>
                <li>Not share personal contact information to avoid platform fees</li>
                <li>Leave honest and constructive reviews</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-5" className="text-2xl font-semibold text-gray-900 mb-4">
                5. Seller Obligations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a seller, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide services as described in your gig listing</li>
                <li>Deliver work within the agreed timeframe</li>
                <li>Maintain professional communication with buyers</li>
                <li>Only offer services you are qualified to perform</li>
                <li>Not use copyrighted or trademarked materials without permission</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-6" className="text-2xl font-semibold text-gray-900 mb-4">
                6. Payment Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform operates on a secure escrow system:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Service Fee:</strong> We charge a 10% commission on completed transactions</li>
                <li><strong>Payment Hold:</strong> Funds are held in escrow until work is approved</li>
                <li><strong>Release Time:</strong> Sellers receive payment within 3-5 business days after buyer approval</li>
                <li><strong>Refunds:</strong> Available if work is not delivered as agreed, subject to review</li>
                <li><strong>Chargebacks:</strong> May result in account suspension pending investigation</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All prices are in USD unless otherwise stated. You are responsible for any taxes applicable to your transactions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-7" className="text-2xl font-semibold text-gray-900 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Platform Content:</strong> All platform content, including logos, design, text, graphics, and software, is owned by Alina and protected by copyright laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>User Content:</strong> You retain ownership of content you create and upload. By using our Platform, you grant us a license to display, distribute, and promote your content.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Delivery Rights:</strong> Unless otherwise agreed, buyers receive full rights to deliverables upon payment completion.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-8" className="text-2xl font-semibold text-gray-900 mb-4">
                8. Prohibited Activities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users are strictly prohibited from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fraudulent activities or misrepresentation</li>
                <li>Harassment, abuse, or threatening behavior</li>
                <li>Circumventing platform fees by taking transactions off-platform</li>
                <li>Creating multiple accounts to manipulate reviews or ratings</li>
                <li>Selling illegal, harmful, or adult content</li>
                <li>Spamming or unsolicited marketing</li>
                <li>Reverse engineering or scraping platform data</li>
                <li>Impersonating other users or entities</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-9" className="text-2xl font-semibold text-gray-900 mb-4">
                9. Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If a dispute arises between buyer and seller, we provide resolution assistance:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>Contact our support team within 14 days of delivery</li>
                <li>Provide evidence (screenshots, files, communication logs)</li>
                <li>Cooperate with our investigation process</li>
                <li>Accept our final decision, which may include refunds, revisions, or mediation</li>
              </ol>
              <p className="text-gray-700 leading-relaxed">
                For disputes not resolved through our system, you agree to binding arbitration under the laws of [Jurisdiction].
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-10" className="text-2xl font-semibold text-gray-900 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Alina is not liable for the quality, legality, or accuracy of services provided by sellers</li>
                <li>We are not responsible for user actions, communications, or disputes</li>
                <li>Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Platform is provided "as is" without warranties of any kind</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-11" className="text-2xl font-semibold text-gray-900 mb-4">
                11. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account if you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Violate these Terms of Service</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Receive multiple complaints from other users</li>
                <li>Remain inactive for an extended period</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may terminate your account at any time through account settings. Outstanding orders must be completed before account deletion.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-12" className="text-2xl font-semibold text-gray-900 mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms periodically. Significant changes will be communicated via email or platform notification. Continued use of the Platform after changes constitutes acceptance of the new Terms. We recommend reviewing these Terms regularly.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-6">
              <h2 id="section-13" className="text-2xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@alina.com</p>
                <p><strong>Support:</strong> support@alina.com</p>
                <p><strong>Live Chat:</strong> Available 24/7 through the platform</p>
                <p><strong>Address:</strong> [Company Address]</p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200/60">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/privacy"
                className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Privacy Policy</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/cookies"
                className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Cookie Policy</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/faq"
                className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-600">FAQ</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/support"
                className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Contact Support</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
