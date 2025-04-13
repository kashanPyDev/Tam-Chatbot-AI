import { useState } from 'react';

const ChatWidget = ({ 
  primaryColor = '#6366F1', // Indigo
  secondaryColor = '#FFFFFF',
  logo = null,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4'
  };

  return (
    <div className={positionClasses[position]}>
      {/* Chat Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full 
          shadow-lg hover:shadow-xl 
          flex items-center justify-center 
          transition-all duration-300 
          hover:scale-110 hover:rotate-12
          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          animate-pulse
        `}
      >
        {logo ? (
          <img src={logo} alt="Chat Logo" className="w-10 h-10" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
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
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in">
          {/* Modal Header */}
          <div className="p-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="flex items-center space-x-3">
              {logo && (
                <img src={logo} alt="Chat Logo" className="w-10 h-10 rounded-full border-2 border-white" />
              )}
              <h3 className="text-xl font-bold text-white">
                Chat with us
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
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
          <div className="h-[calc(100%-120px)] p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {/* Welcome Message */}
            <div className="flex items-start space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm max-w-[80%]">
                <p className="text-gray-700">Hello! 👋 How can I help you today?</p>
              </div>
            </div>
            
            {/* Placeholder for user messages */}
            <div className="text-center text-gray-500 mt-4">
              <p className="text-sm">Start a conversation with us!</p>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
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