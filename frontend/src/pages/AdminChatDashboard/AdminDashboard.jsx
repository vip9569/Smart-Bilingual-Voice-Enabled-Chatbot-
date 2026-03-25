import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    MessageCircleQuestionMark,
    MessageCircleReply,
    NotebookTabs,
    Target,
    History,
    CircuitBoard,
    Menu,
    ChevronDown,
    LogOut,
    User
} from "lucide-react";
import Intents from "./Intents";
import Dashboard from "./Dashboard";
import Questions from "./Questions";
import UnansweredQueries from "./UnansweredQueries";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatHistory from "./ChatHistory";


export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [active, setActive] = useState("Dashboard");

    const renderComponent = () => {
        switch (active) {
            case "Dashboard":
                return <Dashboard />;
            case "Intents":
                return <Intents />;
            case "Unanswered Queries":
                return <UnansweredQueries />;
            case "Suggested Questions":
                return <SuggestedQuestions />;
            case "Chat History":
                return <ChatHistory />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <div
                className={`bg-white shadow-xl transition-all duration-300 ${sidebarOpen ? "w-64" : " sm:w-20 w-20"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold text-purple-600">
                            Admin Panel
                        </h1>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={active === "Dashboard"}
                        onClick={() => setActive("Dashboard")}
                        open={sidebarOpen}
                    />
                    <SidebarItem
                        icon={Target}
                        label="Intents"
                        active={active === "Intents"}
                        onClick={() => setActive("Intents")}
                        open={sidebarOpen}
                    />
                    {/* <SidebarItem
                        icon={MessageCircleReply}
                        label="Responses"
                        active={active === "Responses"}
                        onClick={() => setActive("Responses")}
                        open={sidebarOpen}
                    /> */}
                    {/* <SidebarItem
                        icon={CircuitBoard}
                        label="Questions"
                        active={active === "Questions"}
                        onClick={() => setActive("Questions")}
                        open={sidebarOpen}
                    /> */}
                    <SidebarItem
                        icon={NotebookTabs}
                        label="Suggested Questions"
                        active={active === "Suggested Questions"}
                        onClick={() => setActive("Suggested Questions")}
                        open={sidebarOpen}
                    />
                    <SidebarItem
                        icon={MessageCircleQuestionMark}
                        label="Unanswered Queries"
                        active={active === "Unanswered Queries"}
                        onClick={() => setActive("Unanswered Queries")}
                        open={sidebarOpen}
                    />
                    <SidebarItem
                        icon={History}
                        label="Chat History"
                        active={active === "Chat History"}
                        onClick={() => setActive("Chat History")}
                        open={sidebarOpen}
                    />
                </nav>
            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <div className="h-16 bg-white shadow flex items-center justify-between px-6 relative">
                    <h2 className="text-lg font-semibold">{active}</h2>

                    {/* User Profile Bubble */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                        >
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                A
                            </div>
                            <ChevronDown size={16} />
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 animate-fadeIn">
                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm">
                                    <User size={16} />
                                    Admin Profile
                                </button>
                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <StatCard title="Total Users" value="1,240" />
                        <StatCard title="Active Sessions" value="312" />
                        <StatCard title="Revenue" value="$8,920" />

                    </div>
                    {renderComponent()}
                    {/* <div><h1>This is just testing web app</h1></div> */}
                </div>

            </div>
        </div>
    );
}

/* Sidebar Item */
function SidebarItem({ icon: Icon, label, active, onClick, open }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition text-wrap ${active
                ? "bg-purple-100 text-purple-600"
                : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            <Icon size={18} />
            {open && <span>{label}</span>}
        </button>
    );
}

/* Stat Card */
function StatCard({ title, value }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
    );
}