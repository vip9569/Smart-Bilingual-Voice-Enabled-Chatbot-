import './index.css'
import ChatWindow from './components/chatbot/ChatWindow';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminChatDashboard/AdminDashboard';
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chat" element={<ChatWindow />}></Route>
      <Route path="/admin" element={<AdminDashboard />}></Route>
    </Routes>
    // <AdminDashboard />
    // <ChatWindow />

  )
}

export default App
