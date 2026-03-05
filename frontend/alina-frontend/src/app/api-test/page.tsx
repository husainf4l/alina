'use client';

import { useState } from 'react';
import apiClient, { getErrorMessage } from '@/lib/api/client';
import { useAuth } from '@/lib/providers/AuthProvider';

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const addResult = (test: string, success: boolean, data?: any) => {
    setTestResults(prev => [...prev, { test, success, data, timestamp: new Date().toISOString() }]);
  };

  const testHealthEndpoint = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/health');
      addResult('Health Check', true, response.data);
    } catch (error) {
      addResult('Health Check', false, getErrorMessage(error));
    }
    setLoading(false);
  };

  const testAuthMe = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/auth/me');
      addResult('Get Current User', true, response.data);
    } catch (error) {
      addResult('Get Current User', false, getErrorMessage(error));
    }
    setLoading(false);
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const testEmail = `test${Date.now()}@example.com`;
      const response = await apiClient.post('/auth/mobile/register', {
        fullName: 'Test User',
        email: testEmail,
        password: 'Test123!@#'
      });
      addResult('Register New User', true, response.data);
      
      // Note: For web app, use /auth/web/register which sets HTTP-only cookies
      // Mobile endpoints return tokens in response (shown here for testing)
    } catch (error) {
      addResult('Register New User', false, getErrorMessage(error));
    }
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Backend Integration Test</h1>
          <p className="text-gray-600">Test your Next.js frontend connection to the .NET backend</p>
          
          {/* Auth Status */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold text-gray-900 mb-2">Authentication Status</h2>
            {isAuthenticated ? (
              <div className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Authenticated as {user?.email || user?.username}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Not authenticated</span>
              </div>
            )}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              onClick={testHealthEndpoint}
              disabled={loading}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
            >
              Test Health Endpoint
            </button>
            <button
              onClick={testRegister}
              disabled={loading}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition-colors"
            >
              Test Registration
            </button>
            <button
              onClick={testAuthMe}
              disabled={loading}
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium transition-colors"
            >
              Test Auth/Me
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
          
          {testResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>No tests run yet. Click a button above to start testing.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${
                    result.success
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      {result.success ? (
                        <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <h3 className="font-semibold text-gray-900">{result.test}</h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="ml-8">
                    <pre className="text-sm bg-white p-3 rounded border border-gray-200 overflow-auto max-h-40">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documentation */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📚 Documentation</h3>
          <p className="text-blue-800 text-sm mb-2">
            Check <code className="bg-blue-100 px-2 py-1 rounded">BACKEND_INTEGRATION.md</code> for complete integration guide
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ API client configured with automatic token refresh</li>
            <li>✅ JWT authentication with bearer tokens</li>
            <li>✅ Error handling and retry logic</li>
            <li>✅ CORS enabled for localhost:3000</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
