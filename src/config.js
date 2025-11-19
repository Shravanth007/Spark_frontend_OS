export const API_CONFIG = {
  BASE_URL: 'https://sparks-backend.onrender.com',
  TIMEOUT: 25000,
  ENDPOINTS: {
    CHAT: '/chat',
    RESET: '/reset',
    HEALTH: '/health'
  }
};

export const STORAGE_KEYS = {
  MESSAGES: 'chatMessages',
  SESSION_ID: 'sessionId'
};

export const SUGGESTIONS = [
  "Tell me about Shravanth's skills and background",
  "What projects is he working on?",
  "How can I connect with him?"
];

export const UI_TEXT = {
  TITLE: "Shravanth's Portfolio",
  SUBTITLE: "Ask our AI anything",
  SUGGESTIONS_LABEL: "Suggestions on what to ask Our AI",
  INPUT_PLACEHOLDER: "Ask me anything about your projects",
  LOADING_TEXT: "Typing...",
  FOOTER_MESSAGE: "Conversations may be recorded to improve AI performance.",
  USER_LABEL: "YOU",
  ASSISTANT_LABEL: "ASSISTANT",
  NEW_CONVERSATION_TOOLTIP: "New conversation"
};
