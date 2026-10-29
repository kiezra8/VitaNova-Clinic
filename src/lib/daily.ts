/**
 * VitaNova Clinic — Daily.co Video Calling Integration
 * Calls the backend /api/daily/room endpoint to securely create private rooms
 * and retrieve authorized access tokens without exposing the API key to the client.
 */

export interface DailyRoomResponse {
  roomUrl: string;
  roomName: string;
  token?: string;
  expiresAt?: number;
}

export async function fetchDailyRoom(params: {
  appointmentId: string;
  userName?: string;
  isDoctor?: boolean;
}): Promise<DailyRoomResponse> {
  const res = await fetch('/api/daily/room', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `Failed to connect to video service (Status: ${res.status})`);
  }

  return res.json();
}

