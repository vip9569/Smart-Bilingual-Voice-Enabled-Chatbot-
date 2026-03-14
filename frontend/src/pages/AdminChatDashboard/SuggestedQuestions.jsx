import { useEffect, useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";

export default function SuggestedQuestions() {
    const [questions, setQuestions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);

    // Fetch from backend
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            // const res = await axios.get("/api/suggestions");
            const res = { data: [] }
            setQuestions(res.data);
            setFiltered(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    // Search + Filter
    useEffect(() => {
        let data = questions;

        if (search) {
            data = data.filter(q =>
                q.question.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterStatus !== "All") {
            data = data.filter(q =>
                filterStatus === "Active" ? q.active : !q.active
            );
        }

        setFiltered(data);
    }, [search, filterStatus, questions]);

    const deleteQuestion = async (id) => {
        await axios.delete(`/api/suggestions/${id}`);
        fetchQuestions();
    };

    const toggleStatus = async (id) => {
        await axios.patch(`/api/suggestions/${id}/toggle`);
        fetchQuestions();
    };

    return (
        <div className="p-6 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Suggested Questions
                </h2>

                <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    <Plus size={18} />
                    New <span className="inline sm:hidden md:hidden">Question</span>
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-wrap gap-4 mb-6 ">

                <div className="flex items-center bg-white shadow px-3 py-2 rounded-lg w-full md:w-1/3">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search question..."
                        className="ml-2 w-full outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="px-3 py-2 border rounded-lg"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-20 text-gray-400 ">
                    Loading questions...
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    No suggested questions found.
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((q) => (
                        <div
                            key={q._id}
                            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-4">

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {q.question}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {q.tags?.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Category: {q.category} |
                                        Priority: {q.priority}
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex flex-col items-end gap-3">

                                    <span
                                        onClick={() => toggleStatus(q._id)}
                                        className={`cursor-pointer text-xs px-3 py-1 rounded-full ${q.active
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {q.active ? "Active" : "Inactive"}
                                    </span>

                                    <div className="flex gap-4">
                                        <button className="text-blue-600 hover:underline flex items-center gap-1">
                                            <Edit size={16} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteQuestion(q._id)}
                                            className="text-red-500 hover:underline flex items-center gap-1"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}