// Test component to verify API integration

'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';

export default function ApiTest() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get('/health');
      return response.data;
    },
  });

  if (isLoading) return <div>Testing API connection...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-green-800 font-semibold">✅ API Connection Successful!</h3>
      <p className="text-green-600">Backend Status: {data?.status}</p>
      <p className="text-green-600">Service: {data?.service}</p>
      <p className="text-green-600">Timestamp: {data?.timestamp}</p>
    </div>
  );
}
