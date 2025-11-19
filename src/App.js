import React from 'react';
import './App.css';
import Error404 from './Error404';
import WelcomeSection from './components/WelcomeSection';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import Footer from './components/Footer';
import { useChat } from './hooks/useChat';

function App() {
  const {
    messages,
    input,
    loading,
    showError,
    messagesEndRef,
    setInput,
    sendMessage,
    startNewConversation,
    handleKeyPress
  } = useChat();

  if (showError) {
    return <Error404 />;
  }

  return (
    <div className="App">
      <div className="chat-container">
        {messages.length === 0 && (
          <WelcomeSection onSuggestionClick={sendMessage} />
        )}

        {messages.length > 0 && (
          <MessageList messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
        )}

        <InputArea
          input={input}
          loading={loading}
          showNewConversation={messages.length > 0}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onSend={() => sendMessage()}
          onNewConversation={startNewConversation}
        />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
