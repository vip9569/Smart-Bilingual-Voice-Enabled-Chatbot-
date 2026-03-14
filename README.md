# 🤖 Smart Bilingual Voice-Enabled Chatbot

A full-stack **AI-powered chatbot** capable of understanding user queries using **semantic search and embeddings**.
The system supports **English and Hindi responses**, maintains **intent versioning**, and uses **vector similarity** to match user queries with stored phrases.

---

## 🚀 Features

* 🌐 **Bilingual Chatbot** – Supports both **English and Hindi** responses.
* 🧠 **Semantic Search with Embeddings** – Uses sentence embeddings to understand user intent.
* 🗂 **Intent-Based Architecture** – Queries are matched against stored intent phrases.
* 📊 **Admin Dashboard** – Manage intents, phrases, and responses.
* 🔄 **Intent Versioning** – Maintain historical versions of chatbot responses.
* 🗃 **Conversation History** – Store user queries and chatbot responses.
* ❓ **Unanswered Query Tracking** – Logs queries that do not match existing intents.
* 🎤 **Voice Input Support** – Allows users to interact using voice.
* 📱 **Responsive UI** – Works across mobile, tablet, and desktop devices.

---

## 🏗 System Architecture

```
User Query
     ↓
Generate Embedding
     ↓
Compare with Stored Phrase Embeddings
     ↓
Cosine Similarity Matching
     ↓
Identify Best Intent
     ↓
Fetch Latest Response Version
     ↓
Return Chatbot Response
```

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI / NLP

* Hugging Face Transformers
* Sentence Embeddings (`all-MiniLM-L6-v2`)
* Cosine Similarity

---

## 📂 Project Structure

```
Smart-Bilingual-Voice-Enabled-Chatbot
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   └── App.js
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   │    └── embedding.js
│   └── server.js
│
├── README.md
└── package.json
```

---

## 🗄 Database Design

### Collections

#### 1️⃣ Intents

#### 2️⃣ Intent Versions

#### 3️⃣ Intent Phrases

#### 4️⃣ Messages

#### 5️⃣ Unanswered Queries

Stores queries that did not match any intent.

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vip9569/smart-bilingual-chatbot.git
cd smart-bilingual-chatbot
```

---

### 2️⃣ Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

### 3️⃣ Configure Environment Variables

Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 4️⃣ Run the Application

Start backend

```bash
npm run dev
```

Start frontend

```bash
npm start
```

---

## 💬 Example API Request

### Chat API

```
POST /api/chat
```

Request:

```
{
  "query": "How can I pay my bill?"
}
```

Response:

```
{
  "intent": "payment",
  "confidence": 0.91,
  "response": {
    "en": "You can pay using UPI",
    "hi": "आप UPI से भुगतान कर सकते हैं"
  }
}
```

---

## 🧠 How Embeddings Work

The chatbot converts user queries into **vector embeddings** and compares them with stored phrase embeddings.

Example:

```
Query: "How do I make payment?"
Stored Phrase: "How can I pay?"

Cosine Similarity Score → 0.91
```

The closest match determines the chatbot's response.

---

---

## 🔮 Future Improvements

* MongoDB **Vector Search** integration
* Real-time **streaming responses**
* **Multi-language support** beyond Hindi & English
* **Intent analytics dashboard**
* **Speech-to-text and text-to-speech improvements**

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Submit a pull request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Vikas Yadav**

GitHub: https://github.com/vip9569
LinkedIn: https://linkedin.com/in/vikas-yadav-9ba992254/

---

⭐ If you found this project useful, consider giving it a star!
