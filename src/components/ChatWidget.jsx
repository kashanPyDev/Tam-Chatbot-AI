import { useState, useRef, useEffect } from 'react';

const ChatWidget = ({ 
  primaryColor = '#6366F1', // Indigo
  secondaryColor = '#FFFFFF',
  logo = null,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hello! How can I help you today?',
      options: [
        'Book A Demo',
        'Services',
        'Ask a Question',
        'Pricing',
        'Leads'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'I received your message!' }]);
        scrollToBottom();
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecordingTimer = () => {
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecordingTimer = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecordingTimer();
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'user', 
          text: `[Voice message recorded for ${recordingTime} seconds]` 
        }]);
        scrollToBottom();
      }, 500);
    } else {
      startRecordingTimer();
    }
    setIsRecording(!isRecording);
  };

  const handleOptionClick = (option) => {
    // Add user's selection as a message
    setMessages(prev => [...prev, { type: 'user', text: option }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = '';
      switch(option) {
        case 'Book A Demo':
          response = 'I can help you schedule a demo. Please let me know your preferred date and time.';
          break;
        case 'Services':
          response = 'We offer a wide range of services including AI chatbots, automation, and custom solutions. Which area interests you?';
          break;
        case 'Ask a Question':
          response = 'Feel free to ask any question! I\'m here to help.';
          break;
        case 'Pricing':
          response = 'Our pricing plans are flexible and tailored to your needs. Would you like to see our pricing packages?';
          break;
        case 'Leads':
          response = 'I can help you with lead generation and management. What specific information are you looking for?';
          break;
        default:
          response = 'How can I assist you with that?';
      }
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      scrollToBottom();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      stopRecordingTimer();
    };
  }, []);

  const positionClasses = {
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4'
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`chat-widget-container ${positionClasses[position]}`}>
      {/* Chat Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full 
          shadow-lg hover:shadow-2xl 
          flex items-center justify-center 
          transition-all duration-300 
          hover:scale-110 hover:rotate-12
          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          animate-pulse
          group
          relative
          overflow-hidden
        `}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
        
        {logo ? (
          <img src={logo} alt="Chat Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in border border-white/20">
          {/* Modal Header */}
          <div className="p-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 animate-gradient-x" />
            
            <div className="flex items-center space-x-3 relative z-10">
              {logo && (
                <img 
                  src={logo} 
                  alt="Chat Logo" 
                  className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300" 
                />
              )}
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                Chat with us
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-200 relative z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="h-[calc(100%-120px)] p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 chat-scrollbar backdrop-blur-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-3 group`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white font-semibold">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2 relative group-hover:scale-[1.02] transition-all duration-300 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl rounded-t-3xl rounded-l-3xl rounded-br-md'
                      : 'bg-gradient-to-br from-blue-50 to-gray-100 shadow-sm hover:shadow-md backdrop-blur-sm rounded-t-3xl rounded-r-3xl rounded-bl-md'
                  }`}
                >
                  <div className="relative z-10">
                    <p className={`${
                      message.type === 'user'
                        ? 'text-white drop-shadow-sm'
                        : 'text-gray-700'
                    }`}>
                      {message.text}
                    </p>
                    {message.options && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 bg-white/90 cursor-pointer hover:bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`absolute inset-0 rounded-3xl overflow-hidden ${
                    message.type === 'user' ? 'opacity-20' : 'opacity-10'
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      message.type === 'user'
                        ? 'from-blue-400/30 via-cyan-400/30 to-blue-400/30'
                        : 'from-gray-200/30 via-gray-100/30 to-gray-200/30'
                    } animate-gradient-x`} />
                  </div>

                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20'
                      : 'bg-gradient-to-br from-gray-100/20 to-white/20'
                  }`} />
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white font-semibold">U</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-white/20">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 rounded-xl border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                />
                {/* Microphone Button with Recording Animation */}
                <button
                  onClick={toggleRecording}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                    isRecording
                      ? 'bg-pink-500 text-white animate-pulse shadow-lg'
                      : 'text-gray-500 hover:text-indigo-500 hover:bg-indigo-100'
                  }`}
                >
                  {isRecording ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-white rounded-full animate-wave" style={{ animationDelay: '0.1s' }} />
                        <div className="w-1 h-4 bg-white rounded-full animate-wave" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-4 bg-white rounded-full animate-wave" style={{ animationDelay: '0.3s' }} />
                      </div>
                      <span className="text-xs text-white">{formatTime(recordingTime)}</span>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 