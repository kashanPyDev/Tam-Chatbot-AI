import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center p-8">
        Welcome to Chatbot Widget Demo
      </h1>
      <ChatWidget 
        primaryColor="#4F46E5" 
        secondaryColor="#FFFFFF"
        position="bottom-right"
      />
    </div>
  )
}

export default App
