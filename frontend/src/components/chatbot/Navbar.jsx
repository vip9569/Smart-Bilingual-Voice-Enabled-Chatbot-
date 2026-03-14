import { useState } from "react";
import { Home, BarChart2, User } from "lucide-react";

const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "history", label: "History", icon: BarChart2 },
    { id: "profile", label: "Profile", icon: User },
];

export default function BottomNavbar() {
    const [active, setActive] = useState("home");

    return (
        <div className="min-h-screen bg-purple-200 flex items-end justify-center pb-10">

            <div className="relative w-[340px] bg-gray-200 rounded-full h-20 flex items-center justify-around shadow-xl">

                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className="relative flex flex-col items-center justify-center w-20"
                        >

                            {/* Floating Circle */}
                            {isActive && (
                                <div className="absolute -top-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
                                    <Icon className="text-purple-600" size={24} />
                                </div>
                            )}

                            {/* Default Icon */}
                            {!isActive && (
                                <Icon className="text-gray-400" size={22} />
                            )}

                            {/* Label */}
                            <span
                                className={`text-xs mt-1 ${isActive ? "text-purple-600 font-medium" : "text-gray-400"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
