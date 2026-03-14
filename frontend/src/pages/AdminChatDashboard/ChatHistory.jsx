import { useState } from "react";
import { X } from "lucide-react";

export default function ChatHistory() {
    const [selectedUser, setSelectedUser] = useState(null);

    // Dummy Data (Replace with API later)
    const users = [
        {
            id: 1,
            name: "Rahul Sharma",
            lastMessage: "Thank you!",
            lastActive: "Today, 10:45 AM",
            totalMessages: 12,
            chats: [
                {
                    date: "2024-02-15",
                    messages: [
                        { sender: "user", text: "Hello", time: "10:30 AM" },
                        { sender: "bot", text: "Hi! How can I help you?", time: "10:31 AM" },
                        { sender: "user", text: "I want help with my order.", time: "10:32 AM" },
                        { sender: "bot", text: "Sure! Please share order ID.", time: "10:33 AM" }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Anita Verma",
            lastMessage: "Order confirmed",
            lastActive: "Yesterday",
            totalMessages: 8,
            chats: [
                {
                    date: "2024-02-14",
                    messages: [
                        { sender: "user", text: "Is my order shipped?", time: "09:00 AM" },
                        { sender: "bot", text: "Yes, it has been shipped.", time: "09:02 AM" }
                    ]
                }
            ]
        }
    ];

    return (
        <div className="p-6 w-full">

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6">
                Chat History
            </h2>

            {/* User Cards */}
            <div className="space-y-4">
                {users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border"
                    >
                        <div className="flex justify-between items-center flex-wrap gap-3">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Last message: {user.lastMessage}
                                </p>
                            </div>

                            <div className="text-sm text-gray-500 text-right">
                                <p>Total Messages: {user.totalMessages}</p>
                                <p>Last Active: {user.lastActive}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative max-h-[85vh] flex flex-col">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                {selectedUser.name}'s Chats
                            </h3>
                            <button onClick={() => setSelectedUser(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Content */}
                        <div className="overflow-y-auto space-y-6 pr-2">

                            {selectedUser.chats.map((day, index) => (
                                <div key={index}>
                                    <div className="text-center text-gray-400 text-sm mb-4">
                                        {day.date}
                                    </div>

                                    {day.messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex mb-3 ${msg.sender === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`px-4 py-2 rounded-xl text-sm max-w-xs shadow ${msg.sender === "user"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                <p>{msg.text}</p>
                                                <div className="text-xs opacity-70 mt-1 text-right">
                                                    {msg.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}