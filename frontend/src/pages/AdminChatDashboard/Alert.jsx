import { CheckCircle, XCircle } from "lucide-react";

export default function Alert({ type, message }) {
    const isSuccess = type === "success";

    return (
        <div
            className={`flex items-start gap-3 p-3 rounded-lg text-sm font-medium shadow-sm 
      ${isSuccess
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
        >
            {isSuccess ? (
                <CheckCircle size={18} />
            ) : (
                <XCircle size={18} />
            )}

            <span>{message}</span>
        </div>
    );
}