import React from 'react';
import ReactMarkdown from 'react-markdown';
import { UI_TEXT } from '../config';

const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const cleanUrl = url.replace(/[.,;:!?)]$/, '');
    const punctuation = url.slice(cleanUrl.length);
    return `[${cleanUrl}](${cleanUrl})${punctuation}`;
  });
};

const MessageList = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="messages">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message-wrapper ${msg.role}`}>
          <div className="message-label">
            {msg.role === 'user' ? UI_TEXT.USER_LABEL : UI_TEXT.ASSISTANT_LABEL}
          </div>
          <div className="message-content">
            <ReactMarkdown>
              {msg.role === 'assistant' ? linkify(msg.content) : msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      {loading && (
        <div className="message-wrapper assistant">
          <div className="message-label">{UI_TEXT.ASSISTANT_LABEL}</div>
          <div className="message-content loading-dots">{UI_TEXT.LOADING_TEXT}</div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
