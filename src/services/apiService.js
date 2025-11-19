import { API_CONFIG } from '../config';

export const sendChatMessage = async (message, sessionId, signal) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
    signal
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
};

export const resetConversation = async (sessionId) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId })
  });

  return response.ok;
};
