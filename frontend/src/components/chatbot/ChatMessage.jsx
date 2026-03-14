import React from "react";

export default function ChatMessage({
    message,
    sender,// "user" or "bot"
    timestamp
}) {
    const isUser = sender //=== "user";

    return (
        <div className={`flex w-full my-2 ${isUser === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-[75%]`}>

                {/* Bot Avatar */}
                {isUser === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                        🤖
                    </div>
                )}

                {/* Message Bubble */}
                <div className={`px-4 py-2 rounded-2xl text-sm shadow-md
                            ${isUser === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}>
                    <p>{message}</p>

                    {/* Timestamp */}
                    {timestamp && (
                        <div className={`text-[10px] mt-1 ${isUser === "user" ? "text-purple-200" : "text-gray-400"}`} >
                            {timestamp}
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                {isUser === "user" && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                        👤
                    </div>
                )}
            </div>
        </div>
    );
}