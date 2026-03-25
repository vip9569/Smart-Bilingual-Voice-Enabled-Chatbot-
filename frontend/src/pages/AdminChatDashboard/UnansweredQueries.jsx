import { useEffect, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import axios from "axios";
import AddIntentForm from "./AddIntentForm";

export default function UnansweredQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);

    const [form, setForm] = useState({
        intentName: "",
        description: "",
        intentPhrase: "",
        responseHindi: "",
        responseEnglish: "",
        status: "",
    });

    useEffect(() => {
        fetchUnanswered();
    }, []);

    const fetchUnanswered = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/unanswered-queries");
            setQuestions(res.data);
            console.log(res.data)
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const openModal = (q) => {
        setSelected(q);
        setForm({
            intentName: "",
            description: "",
            intentPhrase: q.query,
            responseHindi: "",
            responseEnglish: "",
            status: true,
        });
    };

    const handleAddFromUnanswered = async (form) => {
        if (!form.intentName || !form.description || !form.intentPhrase || !form.intentPhrase || !form.responseHindi || !form.responseEnglish) {
            alert("All fields are required !")
            return;
        }
        const newIntent = {
            intentName: form.intentName.trim(),
            description: form.description.trim(),
            intentPhrase: form.intentPhrase,
            response: {
                hi: form.responseHindi,
                en: form.responseEnglish
            },
            status: form.status
        };
        try {
            const result = await axios.post("http://localhost:5000/api/intents/add-intents", newIntent)

            console.log(result.data)

            setSelected(null)
            fetchUnanswered()
        } catch (error) {
            console.log(error)
        }

        // setIntents([...intents, newIntent]);
        // setShowModal(false);
        setForm({
            intentName: "",
            description: "",
            intentPhrase: "",
            responseHindi: "",
            responseEnglish: "",
            status: true,
        });
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
                                        <p>First Asked: {new Date(q.createdAt).toLocaleString()}</p>
                                        <p>Last Asked: {new Date(q.updatedAt).toLocaleString()}</p>
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
                <AddIntentForm
                    form={form}
                    setForm={setForm}
                    edit={false}
                    onClose={() => setSelected(null)}
                    onSubmit={handleAddFromUnanswered} />

            )}

        </div>


    );
}