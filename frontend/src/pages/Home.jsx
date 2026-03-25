import { MessageCircle, Bot, Zap, Globe } from "lucide-react";
import ChatWindow from "../components/chatbot/ChatWindow";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">

            {/* HERO SECTION */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    Smart AI Chatbot for <br />
                    <span className="text-purple-600">Instant Conversations</span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-xl">
                    Build intelligent conversations with our bilingual AI chatbot.
                    Get instant answers, automate support, and improve user experience.
                </p>

                <div className="mt-6 flex gap-4 flex-wrap justify-center">
                    <button
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                        Start Chatting
                    </button>

                    <button
                        onClick={() => navigate("/admin")}
                        className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                        View Dashboard
                    </button>
                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 py-12 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <Feature icon={<Bot />} title="AI Powered" desc="Smart intent recognition & NLP" />
                <Feature icon={<Globe />} title="Bilingual" desc="Supports Hindi & English" />
                <Feature icon={<Zap />} title="Fast Response" desc="Real-time replies" />
                <Feature icon={<MessageCircle />} title="24/7 Support" desc="Always available" />

            </section>

            {/* CHAT PREVIEW */}
            <section className="px-6 py-16 flex justify-center">
                <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-5">

                    <h3 className="font-semibold mb-4 text-gray-700">
                        Live Chat Preview
                    </h3>

                    <div className="space-y-3 text-sm">

                        {/* User */}
                        <div className="flex justify-end">
                            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg max-w-xs">
                                Hello, how can I order?
                            </div>
                        </div>

                        {/* Bot */}
                        <div className="flex justify-start">
                            <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-xs">
                                You can browse products and add them to cart 🛒
                            </div>
                        </div>

                    </div>

                    {/* Input */}
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                        />
                        <button className="bg-purple-600 text-white px-4 rounded-lg">
                            Send
                        </button>
                    </div>
                </div>
            </section>

            {/* Chat bot window */}
            <ChatWindow />

            {/* FOOTER */}
            <footer className="text-center text-gray-500 py-6 text-sm">
                © 2026 Chatbot App. All rights reserved.
            </footer>

        </div>

    );
}

function Feature({ icon, title, desc }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-3 text-purple-600">
                {icon}
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{desc}</p>
        </div>
    );
}