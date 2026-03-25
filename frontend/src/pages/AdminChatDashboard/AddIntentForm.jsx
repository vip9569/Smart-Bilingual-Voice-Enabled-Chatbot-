import React from "react";
import { X } from "lucide-react";

const AddIntentForm = ({ form, setForm, edit, onClose, onSubmit }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh] no-scrollbar">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {edit ? "Edit Intent" : "Create New Intent"}
                    </h3>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <div className="grid md:grid-cols-2 gap-4">

                    <Input
                        label="Intent Name"
                        value={form.intentName || ""}
                        onChange={(v) => setForm({ ...form, intentName: v })}
                    />

                    <Input
                        label="Description"
                        value={form.description || ""}
                        onChange={(v) => setForm({ ...form, description: v })}
                    />

                    <Input
                        label="Intent Phrase"
                        value={form.intentPhrase || ""}
                        onChange={(v) => setForm({ ...form, intentPhrase: v })}
                    />

                    <div className="flex items-center gap-3 mt-6">
                        <label className="font-medium">Status</label>
                        <input
                            type="checkbox"
                            checked={form.status}
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.checked })
                            }
                        />
                    </div>
                </div>

                {/* Responses */}
                <div className="mt-4">
                    <textarea
                        placeholder="Response (Hindi)"
                        className="w-full p-3 border rounded-lg mb-3"
                        value={form.responseHindi || ""}
                        onChange={(e) =>
                            setForm({ ...form, responseHindi: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Response (English)"
                        className="w-full p-3 border rounded-lg"
                        value={form.responseEnglish || ""}
                        onChange={(e) =>
                            setForm({ ...form, responseEnglish: e.target.value })
                        }
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={() => onSubmit(form)}
                    className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Save Intent
                </button>

            </div>
        </div>
    );
};

function Input({ label, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
        </div>
    );
}

export default AddIntentForm;