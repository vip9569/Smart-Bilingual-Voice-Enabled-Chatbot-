import ChatMessage from "./ChatMessage";
import { Robot } from "../../assets/lottie/LottieUI";
import axios from 'axios'

import { useState, useEffect, useRef } from "react";
import { X, Navigation, Mic, Square } from "lucide-react";


export default function ChatWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSpecialUI, setShowSpecialUI] = useState(false);
    const [messages, setMessages] = useState([{ text: "How may I help you ?", sender: "bot" }])
    const [userMessage, setUserMessage] = useState("")
    const chatEndRef = useRef(null);

    // Chat message API calling

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async () => {

        if (!userMessage.trim()) return;

        const newMessage = {
            sender: "user",
            text: userMessage
        };

        setMessages(prev => [...prev, newMessage]);

        setUserMessage("");

        const result = await axios.post(
            "http://localhost:5000/api/chat/message",
            { query: userMessage }
        );

        const botMessage = {
            sender: "bot",
            text: result.data.response
        };

        setMessages(prev => [...prev, botMessage]);
    };

    // MIC Enable option 
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const audioChunksRef = useRef([]);

    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: "audio/webm",
                });

                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);

                console.log("Audio recorded:", audioBlob);

                // Optional upload
                uploadAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);

        } catch (error) {
            console.error("Permission denied or error:", error);
            alert("Microphone permission is required.");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        streamRef.current?.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
    };

    const uploadAudio = async (blob) => {
        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");

        await fetch("/upload-audio", {
            method: "POST",
            body: formData,
        });

        console.log("Audio uploaded");
    };


    useEffect(() => {
        setShowSpecialUI(true);
    }, []);

    const uiChange = () => {
        setIsOpen(!isOpen)
        setShowSpecialUI(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 h-96 bg-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fadeIn">

                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Chat Support</h2>
                        <button onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="p-4 h-full overflow-y-auto no-scrollbar">


                        {messages.map((msg, index) => (<ChatMessage
                            key={index}
                            sender={msg.sender}
                            message={msg.text}
                            timestamp="10:30 AM"
                        />))}

                        <div ref={chatEndRef}></div>

                    </div>

                    {/* Input Area*/}
                    <div className="p-2 border-t flex flex-col rounded-2xl gap-2">
                        <div className="flex">
                            {!isRecording && <button onClick={startRecording} disabled={isRecording} className=" text-black px-1 py-1 rounded-lg text-sm hover:bg-blue-200 transition">
                                <Mic size={23} />
                            </button>}
                            {isRecording && <button onClick={stopRecording} disabled={!isRecording} className=" text-black px-1 py-1 rounded-lg text-sm hover:bg-blue-200 transition">
                                <Square size={23} />
                            </button>}
                            <textarea
                                value={userMessage}
                                onChange={(m) => setUserMessage(m.target.value)}
                                rows={1}
                                className="flex-1 px-1 py-2 rounded-lg focus:outline-none text-sm resize-none no-scrollbar">
                            </textarea>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                {/* <AiOutlineSend /> */}
                                <Navigation size={23} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            {showSpecialUI && (
                <p className=" flex">
                    How may I help you ?
                </p>
            )}

            <button
                onClick={uiChange}
                className={`hover:bg-blue-700  text-white rounded-full shadow-lg transition-all duration-300 `}
            >
                {!isOpen && <Robot />}
            </button>

        </div>
    );
}

