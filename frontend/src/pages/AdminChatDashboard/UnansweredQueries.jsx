import { useEffect, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import axios from "axios";

export default function UnansweredQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);

    const [form, setForm] = useState({
        question: "",
        category: "",
        tags: "",
        responseHindi: "",
        responseEnglish: "",
        priority: 1,
        active: true
    });

    useEffect(() => {
        fetchUnanswered();
    }, []);

    const fetchUnanswered = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/unanswered-queries");
            setQuestions(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const openModal = (q) => {
        setSelected(q);
        setForm({
            question: q.question,
            category: "",
            tags: "",
            responseHindi: "",
            responseEnglish: "",
            priority: 1,
            active: true
        });
    };

    const addToDatabase = async () => {
        await axios.post("/api/suggestions", {
            ...form,
            tags: form.tags.split(",").map(t => t.trim())
        });

        await axios.delete(`/api/unanswered/${selected._id}`);

        setSelected(null);
        fetchUnanswered();
    };

    const ignoreQuestion = async (id) => {
        await axios.delete(`http://localhost:5000/api/admin/delete-query/${id}`);
        fetchUnanswered();
    };

    return (
        <div className="p-6 w-full">

            <h2 className="text-2xl font-semibold mb-6">
                Unanswered Questions
            </h2>

            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Loading...
                </div>
            ) : questions.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    No unanswered questions 🎉
                </div>
            ) : (
                <div className="space-y-5">
                    {questions.map((q, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
                        >
                            <div className="flex justify-between flex-wrap gap-4">

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {q.query}
                                    </h3>

                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Asked {q.count} times</p>
                                        <p>First Asked: {new Date(q.firstAsked).toLocaleString()}</p>
                                        <p>Last Asked: {new Date(q.lastAsked).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => openModal(q)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Add to Database
                                    </button>

                                    <button
                                        onClick={() => ignoreQuestion(q._id)}
                                        className="text-red-500 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 size={16} />
                                        Ignore
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Add Suggested Question
                            </h3>
                            <button onClick={() => setSelected(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <textarea
                            className="w-full p-3 border rounded-lg mb-4"
                            value={form.question}
                            onChange={(e) =>
                                setForm({ ...form, question: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full p-2 border rounded-lg mb-4"
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            className="w-full p-2 border rounded-lg mb-4"
                            onChange={(e) =>
                                setForm({ ...form, tags: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Response (Hindi)"
                            className="w-full p-3 border rounded-lg mb-3"
                            onChange={(e) =>
                                setForm({ ...form, responseHindi: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Response (English)"
                            className="w-full p-3 border rounded-lg mb-4"
                            onChange={(e) =>
                                setForm({ ...form, responseEnglish: e.target.value })
                            }
                        />

                        <div className="flex gap-4 mb-4">
                            <input
                                type="number"
                                placeholder="Priority"
                                className="p-2 border rounded-lg w-1/2"
                                onChange={(e) =>
                                    setForm({ ...form, priority: e.target.value })
                                }
                            />

                            <label className="flex items-center gap-2">
                                Active
                                <input
                                    type="checkbox"
                                    checked={form.active}
                                    onChange={(e) =>
                                        setForm({ ...form, active: e.target.checked })
                                    }
                                />
                            </label>
                        </div>

                        <button
                            onClick={addToDatabase}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Save & Publish
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}