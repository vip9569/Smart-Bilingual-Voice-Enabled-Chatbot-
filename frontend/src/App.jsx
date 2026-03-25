import './index.css'
import ChatWindow from './components/chatbot/ChatWindow';
import AdminDashboard from './pages/AdminChatDashboard/AdminDashboard';

function App() {

  return (
    <>

      <div>
        <AdminDashboard />
        <ChatWindow />
      </div>
    </>
  )
}

export default App
