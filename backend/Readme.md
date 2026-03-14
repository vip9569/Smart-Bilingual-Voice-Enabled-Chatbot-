# Bilingual Static Chatbot — NoSQL + Vector Schema Design

## 1. Objective

Design a production-grade data model for a multilingual (Hindi/English) chatbot where:

- responses are predefined
- user queries are free-form
- intent matching uses vector similarity
- system supports monitoring, evolution, and versioning

---

# 2. Architecture Overview

```text
User Query
   ↓
Language Detection
   ↓
Embedding Model
   ↓
Vector Search (intent_vectors)
   ↓
Intent Lookup (intents)
   ↓
Response[lang]
```

Data storage is split into:

- semantic index store → fast similarity search
- intent store → canonical responses
- telemetry → learning & analytics

---

# 3. Collections

## 3.1 `intents` — Canonical intent definitions

**Purpose:** single source of truth for responses and metadata.

**Cardinality:** 1 document = 1 chatbot intent

```json
{
  "_id": "intent_refund",
  "domain": "payments",
  "tags": ["refund", "billing"],

  "responses": {
    "en": { "text": "You can request a refund within 7 days." },
    "hi": { "text": "आप 7 दिनों के भीतर रिफंड का अनुरोध कर सकते हैं।" }
  },

  "channels": ["web", "whatsapp"],
  "priority": 5,
  "active": true,

  "version": 3,
  "embeddingModel": "bge-m3-v1",

  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

**Notes**

- No embeddings stored here
- Language-specific responses grouped
- Version increments on response change

---

## 3.2 `intent_vectors` — Vector search index

**Purpose:** semantic matching of user queries to intents.

**Cardinality:** 1 document = 1 paraphrase embedding

```json
{
  "_id": "vec_873264",
  "intentId": "intent_refund",

  "lang": "hi",
  "text": "रिफंड कैसे मिलेगा",
  "embedding": [float],

  "domain": "payments",
  "tags": ["refund"],

  "intentVersion": 3,
  "embeddingModel": "bge-m3-v1",

  "active": true,
  "createdAt": "ISODate"
}
```

**Index**

- vector: `embedding`
- filters: `intentId`, `lang`, `domain`, `active`

**Notes**

- Flattened for fast ANN search
- Multiple paraphrases per intent
- Re-embedding does not touch intents

---

## 3.3 `query_logs` — Query telemetry

**Purpose:** monitoring and evaluation of retrieval quality.

```json
{
  "_id": "log_928374",

  "queryText": "refund ka process kya hai",
  "lang": "hi",
  "embedding": [float],

  "matchedIntentId": "intent_refund",
  "similarity": 0.91,
  "threshold": 0.80,

  "fallback": false,
  "responseLang": "hi",

  "sessionId": "sess_123",
  "createdAt": "ISODate"
}
```

**Usage**

- accuracy measurement
- threshold tuning
- paraphrase mining
- analytics dashboards

---

## 3.4 `fallbacks` — Unmatched queries

**Purpose:** capture unresolved user intent for human review.

```json
{
  "_id": "fb_88213",

  "queryText": "refund after 2 months possible",
  "lang": "en",
  "embedding": [float],

  "topCandidates": [
    {"intentId": "intent_refund", "score": 0.52}
  ],

  "resolvedIntentId": null,
  "status": "unreviewed",

  "createdAt": "ISODate"
}
```

**Lifecycle**

unreviewed → mapped → new vector added

---

## 3.5 `intents_history` — Version archive

**Purpose:** immutable history of intent responses.

```json
{
  "_id": "intent_refund_v2",
  "intentId": "intent_refund",
  "version": 2,

  "responses": {
    "en": { "text": "Refund allowed within 5 days" },
    "hi": { "text": "रिफंड 5 दिनों में" }
  },

  "embeddingModel": "bge-m3-v0",
  "archivedAt": "ISODate"
}
```

---

# 4. Retrieval Contract

## Input

```json
{
  "query": "user text"
}
```

## Steps

1. detect language
2. embed query
3. vector search top-k
4. apply similarity threshold
5. fetch intent
6. return response[lang]

## Output

```json
{
  "intentId": "intent_refund",
  "response": "आप 7 दिनों के भीतर रिफंड का अनुरोध कर सकते हैं।",
  "confidence": 0.91
}
```

---

# 5. Threshold Policy

Typical multilingual embedding similarity:

- ≥ 0.85 → confident match
- 0.75–0.85 → acceptable
- < 0.75 → fallback

Threshold stored per log for tuning.

---

# 6. Update & Evolution

### Add paraphrase

- insert into `intent_vectors`

### Change response

- archive to `intents_history`
- increment `intents.version`

### Change embedding model

- re-embed vectors
- update `embeddingModel`

---

# 7. Key Design Principles

- intents and vectors separated
- multiple paraphrases per intent
- multilingual embeddings shared space
- immutable version history
- telemetry-driven improvement
- safe re-embedding
- filterable vector search

---

# 8. Production Capabilities Enabled

- multilingual FAQ retrieval
- continuous learning loop
- analytics & monitoring
- domain filtering
- channel-specific responses
- version rollback
- embedding A/B testing
- scalable ANN indexing

---

# 9. Collection Relationships

```text
intents (1)
   ↑
intent_vectors (N)

query_logs → intentId
fallbacks → intent candidates
intents_history → intentId + version
```

---

# 10. Summary

The schema models chatbot knowledge as **intents with multilingual responses**, indexed via **paraphrase embeddings** for semantic retrieval. Supporting collections provide telemetry, fallback capture, and version control, enabling safe evolution and production observability.

---

If you want, I can convert this into:

- MongoDB schema + indexes
- OpenAPI contract
- ER diagram
- architecture diagram

Just say.
