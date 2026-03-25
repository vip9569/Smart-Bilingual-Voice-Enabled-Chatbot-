import { useState } from "react";
import { Plus, X, Trash2, Edit } from "lucide-react";
import axios from 'axios'
import { useEffect } from "react";
import AddIntentForm from "./AddIntentForm";


export default function Intents() {
    const [showModal, setShowModal] = useState(false);
    const [intents, setIntents] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editingId, setEditingId] = useState()

    const [form, setForm] = useState({
        intentName: "",
        description: "",
        intentPhrase: "",
        responseHindi: "",
        responseEnglish: "",
        status: "",
    });

    // Handel Submit
    const handleSubmit = async () => {

        if (!form.intentName || !form.description || !form.intentPhrase || !form.intentPhrase || !form.responseHindi || !form.responseEnglish) {
            alert("All fields are required")
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
            if (edit) {
                const result = await axios.put(`http://localhost:5000/api/intents/update-intent/${editingId}`, newIntent)
            } else {
                const result = await axios.post("http://localhost:5000/api/intents/add-intents", newIntent)
            }
            console.log(result.data)
            fetchAllIntents()
        } catch (error) {
            console.log(error)
        }

        setIntents([...intents, newIntent]);
        setShowModal(false);
        setForm({
            intentName: "",
            description: "",
            intentPhrase: "",
            responseHindi: "",
            responseEnglish: "",
            status: true,
        });
    };

    const handleEdit = (id) => {
        const selected = intents.find(item => item._id === id);

        if (!selected) return;

        setForm({
            intentName: selected.intentName,
            description: selected.description,
            intentPhrase: selected.phrases?.[0]?.phrase || "",
            responseHindi: selected.versions?.[0]?.response?.hi || "",
            responseEnglish: selected.versions?.[0]?.response?.en || "",
            status: selected.status
        });
        setEditingId(id)
        setEdit(true);
        setShowModal(true);

    };

    const deleteIntent = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/intents/delete/${id}`)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
        setIntents(intents.filter(intent => intent._id !== id));
    };

    // fetch all the intents data when pages renders first
    const fetchAllIntents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/intents/get-intents")
            setIntents(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    // render when intents state will be updated
    useEffect(() => {
        fetchAllIntents()
    }, [])

    return (
        <div className="p-6 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Intents</h2>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    <Plus size={18} />
                    New Intent
                </button>
            </div>

            {/* Cards */}
            {
                intents.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        No intents created yet.
                    </div>
                )
                    :
                    (<div className="space-y-5">
                        {intents?.map((intent, i) => (
                            <div
                                key={i}
                                className="w-full bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
                            >
                                {/* Top Section */}
                                <div className="flex justify-between items-start flex-wrap gap-4">

                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {intent.intentName}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span
                                                className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full"
                                            >
                                                {intent.description}
                                            </span>
                                        </div>

                                        {/* List Phrases  */}
                                        <div className="flex flex-wrap gap-2">
                                            {intent.phrases?.length > 0 && intent.phrases.map((phr, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                                                >
                                                    {phr.phrase}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex flex-col items-end gap-2">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-medium ${intent.status
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {intent.status ? "Active" : "Inactive"}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            Version: {intent.currentVersion}
                                        </span>
                                    </div>
                                </div>

                                {/* Responses */}
                                {intent.versions?.length > 0 && intent.versions.map((version, i) => (
                                    <div
                                        key={i}
                                        className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                        < div >
                                            <strong>Hindi:</strong>
                                            <p className="mt-1">{version.response.hi}</p>
                                        </div>
                                        <div>
                                            <strong>English:</strong>
                                            <p className="mt-1">{version.response.en}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Actions */}
                                < div className="flex justify-end gap-4 mt-5" >
                                    <button
                                        onClick={() => handleEdit(intent._id)}
                                        className="text-blue-600 hover:underline flex items-center gap-1">
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteIntent(intent._id)}
                                        className="text-red-500 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        }
                    </div >)}


            {/* Modal */}
            {
                showModal && (<AddIntentForm
                    form={form}
                    setForm={setForm}
                    edit={edit}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit} />

                )
            }

        </div >
    );
}
