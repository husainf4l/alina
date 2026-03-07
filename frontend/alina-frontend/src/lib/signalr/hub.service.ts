// SignalR Hub Connection Service
// Manages connections to SignalR hubs for real-time features

import * as signalR from '@microsoft/signalr';

type ConnectionState = 'Disconnected' | 'Connecting' | 'Connected' | 'Reconnecting';

export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private connectionState: ConnectionState = 'Disconnected';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners: Map<string, Set<Function>> = new Map();

  constructor(
    private hubUrl: string,
    private options?: {
      accessTokenFactory?: () => string | Promise<string>;
      onStateChange?: (state: ConnectionState) => void;
      onError?: (error: Error) => void;
    }
  ) {}

  /**
   * Initialize and start the SignalR connection
   */
  async start(): Promise<void> {
    if (this.connection) {
      console.warn('Connection already exists');
      return;
    }

    this.connectionState = 'Connecting';
    this.options?.onStateChange?.(this.connectionState);

    // Build connection
    const connectionBuilder = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: this.options?.accessTokenFactory,
        withCredentials: true, // Send cookies
      })
      // Disable automatic reconnect since SignalR is optional
      // .withAutomaticReconnect({
      //   nextRetryDelayInMilliseconds: (retryContext) => {
      //     // Reduced attempts for optional SignalR: 1s, 2s, 4s (max 3 attempts)
      //     if (retryContext.previousRetryCount >= 3) {
      //       return null; // Stop reconnecting
      //     }
      //     return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 4000);
      //   },
      // })
      .configureLogging(signalR.LogLevel.Warning);

    this.connection = connectionBuilder.build();

    // Setup event handlers
    this.setupEventHandlers();

    try {
      await this.connection.start();
      this.connectionState = 'Connected';
      this.reconnectAttempts = 0;
      this.options?.onStateChange?.(this.connectionState);
      console.log('✅ SignalR connected:', this.hubUrl);
    } catch (error) {
      this.connectionState = 'Disconnected';
      this.options?.onStateChange?.(this.connectionState);
      this.options?.onError?.(error as Error);
      // Only log connection failures in development since SignalR is optional
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ SignalR connection failed (non-critical):', error);
      }
      throw error;
    }
  }

  /**
   * Stop the connection
   */
  async stop(): Promise<void> {
    if (!this.connection) return;

    try {
      await this.connection.stop();
      this.connectionState = 'Disconnected';
      this.options?.onStateChange?.(this.connectionState);
      this.connection = null;
      console.log('SignalR connection stopped');
    } catch (error) {
      console.error('Error stopping SignalR connection:', error);
    }
  }

  /**
   * Subscribe to a hub method
   */
  on<T = any>(methodName: string, callback: (data: T) => void): () => void {
    if (!this.connection) {
      throw new Error('Connection not initialized. Call start() first.');
    }

    // Register with SignalR
    this.connection.on(methodName, callback);

    // Track listener for cleanup
    if (!this.listeners.has(methodName)) {
      this.listeners.set(methodName, new Set());
    }
    this.listeners.get(methodName)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.connection?.off(methodName, callback);
      const methodListeners = this.listeners.get(methodName);
      if (methodListeners) {
        methodListeners.delete(callback);
        if (methodListeners.size === 0) {
          this.listeners.delete(methodName);
        }
      }
    };
  }

  /**
   * Invoke a hub method
   */
  async invoke<T = void>(methodName: string, ...args: any[]): Promise<T> {
    if (!this.connection) {
      throw new Error('Connection not initialized. Call start() first.');
    }

    if (this.connectionState !== 'Connected') {
      throw new Error(`Cannot invoke '${methodName}': Connection state is ${this.connectionState}`);
    }

    try {
      return await this.connection.invoke<T>(methodName, ...args);
    } catch (error) {
      console.error(`Error invoking ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Send data to hub (fire and forget)
   */
  async send(methodName: string, ...args: any[]): Promise<void> {
    if (!this.connection) {
      throw new Error('Connection not initialized. Call start() first.');
    }

    if (this.connectionState !== 'Connected') {
      console.warn(`Cannot send '${methodName}': Connection state is ${this.connectionState}`);
      return;
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (error) {
      console.error(`Error sending ${methodName}:`, error);
    }
  }

  /**
   * Get current connection state
   */
  getState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectionState === 'Connected';
  }

  /**
   * Get connection ID (useful for tracking)
   */
  getConnectionId(): string | null {
    return this.connection?.connectionId ?? null;
  }

  /**
   * Setup event handlers for connection lifecycle
   */
  private setupEventHandlers(): void {
    if (!this.connection) return;

    this.connection.onreconnecting((error) => {
      this.connectionState = 'Reconnecting';
      this.reconnectAttempts++;
      this.options?.onStateChange?.(this.connectionState);
      console.warn(`⚠️ SignalR reconnecting (attempt ${this.reconnectAttempts}):`, error);
    });

    this.connection.onreconnected((connectionId) => {
      this.connectionState = 'Connected';
      this.reconnectAttempts = 0;
      this.options?.onStateChange?.(this.connectionState);
      console.log('✅ SignalR reconnected:', connectionId);
    });

    this.connection.onclose((error) => {
      this.connectionState = 'Disconnected';
      this.options?.onStateChange?.(this.connectionState);
      if (error) {
        this.options?.onError?.(error);
        console.error('❌ SignalR connection closed with error:', error);
      } else {
        console.log('SignalR connection closed');
      }
    });
  }
}

// Singleton instances for different hubs
let messagingHub: SignalRService | null = null;
let notificationHub: SignalRService | null = null;

/**
 * Get or create messaging hub connection
 */
export function getMessagingHub(): SignalRService {
  if (!messagingHub) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5602';
    
    messagingHub = new SignalRService(`${baseUrl}/hubs/messaging`, {
      accessTokenFactory: () => {
        // Get token from localStorage or cookies
        const token = localStorage.getItem('accessToken');
        return token || '';
      },
      onStateChange: (state) => {
        // Only log state changes in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Messaging Hub State:', state);
        }
      },
      onError: (error) => {
        // Suppress connection errors since SignalR is optional
        if (process.env.NODE_ENV === 'development') {
          console.warn('SignalR messaging connection error (non-critical):', error.message);
        }
      },
    });
  }
  return messagingHub;
}

/**
 * Get or create notification hub connection
 */
export function getNotificationHub(): SignalRService {
  if (!notificationHub) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5602';
    
    notificationHub = new SignalRService(`${baseUrl}/hubs/notifications`, {
      accessTokenFactory: () => {
        const token = localStorage.getItem('accessToken');
        return token || '';
      },
      onStateChange: (state) => {
        // Only log state changes in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Notification Hub State:', state);
        }
      },
      onError: (error) => {
        // Suppress connection errors since SignalR is optional
        if (process.env.NODE_ENV === 'development') {
          console.warn('SignalR connection error (non-critical):', error.message);
        }
      },
    });
  }
  return notificationHub;
}

/**
 * Cleanup all hub connections
 */
export async function cleanupHubs(): Promise<void> {
  const promises: Promise<void>[] = [];
  
  if (messagingHub) {
    promises.push(messagingHub.stop());
    messagingHub = null;
  }
  
  if (notificationHub) {
    promises.push(notificationHub.stop());
    notificationHub = null;
  }
  
  await Promise.all(promises);
}
