import ApiTest from '@/components/ApiTest';

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <ApiTest />
        </div>
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}