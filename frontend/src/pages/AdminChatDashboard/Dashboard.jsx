import { Users, Activity, DollarSign, MessageCircle, Plus } from "lucide-react";
import { useState } from 'react'
import Intents from './Intents'
import UnAnsweredQueries from "./UnansweredQueries";
import ChatHistory from "./ChatHistory";
export default function Dashboard() {

    const [active, setActive] = useState("")

    const renderQuickButtons = () => {
        switch (active) {
            case "Intents":
                return <Intents />;
            case "Chat History":
                return <ChatHistory />;
            case "UnansweredQueries":
                return <UnAnsweredQueries />;
            default:
                return null;
        }
    }

    const stats = [
        {
            title: "Total Users",
            value: "1,240",
            icon: <Users size={20} />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Active Sessions",
            value: "312",
            icon: <Activity size={20} />,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Revenue",
            value: "$8,920",
            icon: <DollarSign size={20} />,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Messages",
            value: "5,340",
            icon: <MessageCircle size={20} />,
            color: "bg-purple-100 text-purple-600",
        },
    ];

    const recentActivity = [
        { user: "Rahul", action: "Asked about payment", time: "2 min ago" },
        { user: "Anita", action: "Created new intent", time: "10 min ago" },
        { user: "Admin", action: "Updated chatbot response", time: "30 min ago" },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <p className="text-gray-500 text-sm">
                    Welcome back! Here’s what’s happening today.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

                    <div className="space-y-4">
                        {recentActivity.map((item, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center border-b pb-3"
                            >
                                <div>
                                    <p className="font-medium">{item.user}</p>
                                    <p className="text-sm text-gray-500">{item.action}</p>
                                </div>
                                <span className="text-xs text-gray-400">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setActive("Intents")}
                            className={`flex items-center gap-2 ${active === "Intents" ? "bg-purple-600 text-white" : ""} border px-4 py-2 rounded-lg transition`}>
                            <Plus size={16} />
                            Add Intent
                        </button>

                        <button
                            onClick={() => setActive("Chat History")}
                            className={`flex items-center gap-2 ${active === "Chat History" ? "bg-purple-600 text-white" : ""} border px-4 py-2 rounded-lg hover:bg-gray-100 transition`}>
                            View Chat History
                        </button>

                        <button
                            onClick={() => setActive("UnansweredQueries")}
                            className={`flex items-center gap-2 ${active === "UnansweredQueries" ? "bg-purple-600 text-white" : ""} border px-4 py-2 rounded-lg hover:bg-gray-100 transition`}>
                            Review Unanswered
                        </button>
                    </div>
                </div>
            </div >

            {/* Bottom Section */}
            < div className="bg-white p-6 rounded-xl shadow" >
                <h3 className="text-lg font-semibold mb-4">System Overview</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Intents</p>
                        <h2 className="text-xl font-bold">42</h2>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Active Bots</p>
                        <h2 className="text-xl font-bold">3</h2>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Pending Queries</p>
                        <h2 className="text-xl font-bold">12</h2>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Accuracy</p>
                        <h2 className="text-xl font-bold text-green-600">94%</h2>
                    </div>
                </div>
            </div >

            {renderQuickButtons()}


        </div >
    );
}