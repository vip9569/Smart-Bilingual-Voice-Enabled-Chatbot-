import { useState } from "react";
import { Plus, X, Trash2, Edit } from "lucide-react";

export default function Questions() {
    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({
        question: "",
        category: "",
        difficulty: "Easy",
        options: ["", "", "", ""],
        correctAnswer: 0,
        active: true
    });

    const handleSubmit = () => {
        if (!form.question) return;

        const newQuestion = {
            id: editing ? editing.id : Date.now(),
            ...form
        };

        if (editing) {
            setQuestions(
                questions.map(q => q.id === editing.id ? newQuestion : q)
            );
        } else {
            setQuestions([...questions, newQuestion]);
        }

        resetForm();
    };

    const resetForm = () => {
        setShowModal(false);
        setEditing(null);
        setForm({
            question: "",
            category: "",
            difficulty: "Easy",
            options: ["", "", "", ""],
            correctAnswer: 0,
            active: true
        });
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const openEdit = (q) => {
        setEditing(q);
        setForm(q);
        setShowModal(true);
    };

    return (
        <div className="p-6 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Questions</h2>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    <Plus size={18} />
                    New <span className="inline sm:hidden x-sm:hidden md:hidden lg:inline">Question</span>
                </button>
            </div>

            {/* Question Cards */}
            <div className="space-y-4">
                {questions.map(q => (
                    <div
                        key={q.id}
                        className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-start flex-wrap gap-3">

                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {q.question}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                                        {q.category}
                                    </span>

                                    <span className="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
                                        {q.difficulty}
                                    </span>

                                    <span className={`text-xs px-3 py-1 rounded-full ${q.active
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                        }`}>
                                        {q.active ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                                    {q.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`p-2 rounded border ${i === q.correctAnswer
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-200"
                                                }`}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => openEdit(q)}
                                    className="text-blue-600 hover:underline"
                                >
                                    <Edit size={16} />
                                </button>

                                <button
                                    onClick={() => deleteQuestion(q.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}

                {questions.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No questions created yet.
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto no-scrollbar">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editing ? "Edit Question" : "Create Question"}
                            </h3>
                            <button onClick={resetForm}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Question Input */}
                        <textarea
                            placeholder="Enter Question"
                            className="w-full p-3 border rounded-lg mb-4"
                            value={form.question}
                            onChange={(e) =>
                                setForm({ ...form, question: e.target.value })
                            }
                        />

                        {/* Category */}
                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full p-2 border rounded-lg mb-4"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        {/* Difficulty */}
                        <select
                            className="w-full p-2 border rounded-lg mb-4"
                            value={form.difficulty}
                            onChange={(e) =>
                                setForm({ ...form, difficulty: e.target.value })
                            }
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        {/* Options */}
                        <div className="space-y-2 mb-4">
                            {form.options.map((opt, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="correct"
                                        checked={form.correctAnswer === index}
                                        onChange={() =>
                                            setForm({ ...form, correctAnswer: index })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        value={opt}
                                        onChange={(e) => {
                                            const newOptions = [...form.options];
                                            newOptions[index] = e.target.value;
                                            setForm({ ...form, options: newOptions });
                                        }}
                                        className="flex-1 p-2 border rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Active Toggle */}
                        <div className="flex items-center gap-3 mb-4">
                            <label>Active</label>
                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) =>
                                    setForm({ ...form, active: e.target.checked })
                                }
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            {editing ? "Update Question" : "Save Question"}
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}