// VitaNova Clinic - Network Sentinel & Connectivity Detector
import { NetworkState } from '../types';

type NetworkCallback = (state: NetworkState, isSimulated: boolean) => void;

class NetworkSentinel {
  private currentState: NetworkState = navigator.onLine ? 'online' : 'offline';
  private simulatedOffline: boolean = false;
  private listeners: Set<NetworkCallback> = new Set();
  private pingIntervalId: number | null = null;
  private lastPingLatencyMs: number = 0;
  private lastOnlineTimestamp: string = new Date().toISOString();

  constructor() {
    // Initial check
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleBrowserOnlineEvent());
      window.addEventListener('offline', () => this.handleBrowserOfflineEvent());

      // Start periodic health check ping (every 10s if online, every 5s if offline to detect recovery promptly)
      this.startHealthPing();
    }
  }

  public getState(): NetworkState {
    if (this.simulatedOffline) return 'offline';
    return this.currentState;
  }

  public isOnline(): boolean {
    return this.getState() === 'online' || this.getState() === 'poor';
  }

  public isSimulated(): boolean {
    return this.simulatedOffline;
  }

  public getLatency(): number {
    return this.lastPingLatencyMs;
  }

  public getLastOnlineTime(): string {
    return this.lastOnlineTimestamp;
  }

  public setSimulatedOffline(simulated: boolean) {
    this.simulatedOffline = simulated;
    console.log(`[VitaNova Network] Simulation mode changed: Offline = ${simulated}`);
    this.notifyListeners();
  }

  public subscribe(cb: NetworkCallback): () => void {
    this.listeners.add(cb);
    cb(this.getState(), this.simulatedOffline);
    return () => this.listeners.delete(cb);
  }

  private notifyListeners() {
    const state = this.getState();
    if (state === 'online' || state === 'poor') {
      this.lastOnlineTimestamp = new Date().toISOString();
    }
    this.listeners.forEach(cb => cb(state, this.simulatedOffline));
  }

  private handleBrowserOnlineEvent() {
    console.log('[VitaNova Network] Browser online event fired. Verifying with health ping...');
    this.verifyActualConnectivity();
  }

  private handleBrowserOfflineEvent() {
    console.log('[VitaNova Network] Browser offline event fired.');
    this.currentState = 'offline';
    this.notifyListeners();
  }

  public async verifyActualConnectivity(): Promise<boolean> {
    if (this.simulatedOffline) {
      return false;
    }

    if (!navigator.onLine) {
      this.currentState = 'offline';
      this.notifyListeners();
      return false;
    }

    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/api/health?t=' + Date.now(), {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const latency = Math.round(performance.now() - startTime);
      this.lastPingLatencyMs = latency;

      if (response.ok) {
        this.currentState = latency > 1500 ? 'poor' : 'online';
        this.lastOnlineTimestamp = new Date().toISOString();
      } else {
        this.currentState = 'offline';
      }
    } catch (err) {
      // In development or when server isn't reached, fallback to browser state gracefully
      this.currentState = navigator.onLine ? 'online' : 'offline';
    }

    this.notifyListeners();
    return this.currentState === 'online' || this.currentState === 'poor';
  }

  private startHealthPing() {
    if (this.pingIntervalId) clearInterval(this.pingIntervalId);
    this.pingIntervalId = window.setInterval(() => {
      this.verifyActualConnectivity();
    }, 15000);
  }
}

export const networkSentinel = new NetworkSentinel();
