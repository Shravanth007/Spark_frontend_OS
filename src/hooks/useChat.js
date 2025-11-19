import { useState, useEffect, useRef } from 'react';
import { 
  getSavedMessages, 
  saveMessages, 
  getSavedSessionId, 
  saveSessionId,
  clearMessages,
  generateSessionId 
} from '../utils/storage';
import { sendChatMessage, resetConversation } from '../services/apiService';
import { API_CONFIG } from '../config';

export const useChat = () => {
  const [messages, setMessages] = useState(getSavedMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(getSavedSessionId);
  const [showError, setShowError] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    saveMessages(messages);
    saveSessionId(sessionId);
  }, [messages, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const data = await sendChatMessage(messageText, sessionId, controller.signal);
      
      clearTimeout(timeoutId);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setShowError(true);
    }
    setLoading(false);
  };

  const startNewConversation = async () => {
    if (messages.length === 0) return;
    
    try {
      const success = await resetConversation(sessionId);
      if (success) {
        console.log('Conversation stored in Supabase');
      }
    } catch (error) {
      console.error('Error storing conversation:', error);
    }
    
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setMessages([]);
    clearMessages();
    saveSessionId(newSessionId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    input,
    loading,
    sessionId,
    showError,
    messagesEndRef,
    setInput,
    sendMessage,
    startNewConversation,
    handleKeyPress
  };
};
