// Stripe Payment Service - API Integration
import { apiClient } from '../axios-config';

export interface CreatePaymentIntentRequest {
  gigId: string;
  packageType: 'basic' | 'standard' | 'premium';
  amount: number;
  currency?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface ProcessPaymentRequest {
  gigId: string;
  packageType: string;
  amount: number;
  paymentMethodId: string;
  saveCard?: boolean;
}

export interface ProcessPaymentResponse {
  orderId: string;
  paymentStatus: string;
  transactionId: string;
}

export const stripePaymentService = {
  /**
   * Create a Stripe Payment Intent
   */
  createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
    const response = await apiClient.post<CreatePaymentIntentResponse>(
      '/payments/stripe/create-intent',
      {
        gigId: data.gigId,
        packageType: data.packageType,
        amount: data.amount,
        currency: data.currency || 'USD',
      }
    );
    return response.data;
  },

  /**
   * Confirm a payment
   */
  confirmPayment: async (data: ConfirmPaymentRequest): Promise<void> => {
    await apiClient.post('/payments/stripe/confirm', {
      paymentIntentId: data.paymentIntentId,
      paymentMethodId: data.paymentMethodId,
    });
  },

  /**
   * Process complete payment (create order + process payment)
   */
  processPayment: async (data: ProcessPaymentRequest): Promise<ProcessPaymentResponse> => {
    const response = await apiClient.post<ProcessPaymentResponse>(
      '/payments/process',
      {
        gigId: data.gigId,
        packageType: data.packageType,
        amount: data.amount,
        paymentMethodId: data.paymentMethodId,
        saveCard: data.saveCard,
      }
    );
    return response.data;
  },

  /**
   * Get saved payment methods
   */
  getSavedPaymentMethods: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get('/payments/methods');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  /**
   * Delete saved payment method
   */
  deletePaymentMethod: async (paymentMethodId: string): Promise<void> => {
    await apiClient.delete(`/payments/methods/${paymentMethodId}`);
  },
};
