export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Search & Discover',
      description: 'Browse thousands of services or post your project requirements. Find the perfect match for your needs.'
    },
    {
      number: 2,
      title: 'Hire & Collaborate',
      description: 'Connect with freelancers, discuss project details, and agree on terms. Our platform ensures secure communication.'
    },
    {
      number: 3,
      title: 'Get Delivered',
      description: 'Receive high-quality work within agreed timelines. Review, approve, and pay only when satisfied.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">How It Works</h2>
          <p className="text-lg text-gray-600">Get started in just 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl shadow-sm flex items-center justify-center mx-auto relative z-10">
                  <span className="text-2xl font-semibold text-white">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gray-200 z-0" style={{ transform: 'translateX(50%)' }}></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gray-50 px-8 py-6 rounded-2xl">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Free to post projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Secure escrow payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}