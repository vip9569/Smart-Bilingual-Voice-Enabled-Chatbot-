
import React, { useRef, useState } from "react";


export default function VoiceInput() {
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

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={startRecording} disabled={isRecording}>
                🎤 Start
            </button>

            <button onClick={stopRecording} disabled={!isRecording}>
                ⏹ Stop
            </button>

            {audioURL && (
                <div style={{ marginTop: "20px" }}>
                    <audio controls src={audioURL}></audio>
                </div>
            )}
        </div>
    );
}
