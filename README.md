# Nistula Technical Assessment

AI-powered unified guest messaging backend built using Express.js, PostgreSQL, and Claude API.

This system receives guest messages from multiple channels, normalizes them into a unified schema, classifies the query type, generates AI-powered hospitality replies using Claude, calculates confidence scores, determines automated actions, and stores all interactions in PostgreSQL.

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Claude Sonnet 4 API
- Zod
- UUID
- express-rate-limit

---

# Features

## Unified Messaging Pipeline

Supports inbound guest messages from:

- WhatsApp
- Airbnb
- Booking.com
- Instagram
- Direct website messages

All incoming payloads are normalized into a unified internal schema before processing.

---

## AI-Powered Guest Replies

The system uses Claude Sonnet 4 to:

- understand guest intent
- generate contextual hospitality replies
- use property-specific context
- assist operational workflows

---

## Query Classification

Messages are classified into:

- pre_sales_availability
- pre_sales_pricing
- post_sales_checkin
- special_request
- complaint
- general_enquiry

Classification is currently keyword-based for deterministic behavior and reliability.

---

## Confidence Scoring

Each AI-generated response receives a confidence score between 0 and 1.

### Confidence Logic

| Query Type | Confidence |
|---|---|
| pre_sales_availability | 0.93 |
| pre_sales_pricing | 0.90 |
| post_sales_checkin | 0.88 |
| general_enquiry | 0.82 |
| special_request | 0.72 |
| complaint | 0.45 |

---

## Action Decision System

| Confidence Score | Action |
|---|---|
| > 0.85 | auto_send |
| 0.60 - 0.85 | agent_review |
| < 0.60 | escalate |

All complaints are automatically escalated regardless of confidence score.

---

## Security Features

### API Key Authentication

Webhook endpoint is protected using:

```http
x-api-key
```

Only authorized systems can access the webhook.

---

### Rate Limiting

Implemented request rate limiting to protect against abuse and excessive traffic.

Current policy:

- 100 requests per 15 minutes per IP

---

## PostgreSQL Persistence

All processed messages and AI metadata are stored in PostgreSQL.

Stored information includes:

- guest messages
- AI replies
- confidence scores
- query type
- action decision
- timestamps

---

# Project Structure

```bash
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── messageController.js
│
├── middlewares/
│   ├── apiKeyMiddleware.js
│   └── rateLimiter.js
│
├── routes/
│   └── messageRoutes.js
│
├── services/
│   ├── claudeService.js
│   ├── classificationService.js
│   ├── confidenceService.js
│   └── actionService.js
│
├── utils/
│   ├── normalizeMessage.js
│   └── propertyContext.js
│
├── validators/
│   └── messageValidator.js
│
├── app.js
└── server.js
```

---

# API Endpoint

## POST `/webhook/message`

### Headers

```http
Content-Type: application/json
x-api-key: your_secret_key
```

---

# Sample Request

```json
{
  "source": "whatsapp",
  "guest_name": "Rahul Sharma",
  "message": "Is the villa available from April 20 to 24? What is the rate for 2 adults?",
  "timestamp": "2026-05-05T10:30:00Z",
  "booking_ref": "NIS-2024-0891",
  "property_id": "villa-b1"
}
```

---

# Sample Response

```json
{
  "message_id": "uuid",
  "query_type": "pre_sales_availability",
  "drafted_reply": "Hi Rahul! Great news — Villa B1 is available from April 20 to 24...",
  "confidence_score": 0.93,
  "action": "auto_send"
}
```

---

# Database Schema

The PostgreSQL schema supports:

- unified guest profiles
- reservations
- conversations
- omnichannel messaging
- AI metadata tracking
- human review workflows

Main tables:

- guests
- properties
- reservations
- conversations
- messages
- message_ai_metadata

Schema file:

```bash
schema.sql
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/JeetDas5/nistula-technical-assessment
cd nistula-technical-assessment
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env`

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/nistula

CLAUDE_API_KEY=your_claude_api_key

WEBHOOK_API_KEY=your_secret_key
```

---

## 4. Start PostgreSQL

Create database:

```sql
CREATE DATABASE nistula;
```

---

## 5. Run Schema

```bash
psql -U postgres -d nistula -f schema.sql
```

---

## 6. Start Server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# Testing

The system was tested with multiple scenarios:

1. Availability enquiry
2. Pricing enquiry
3. Complaint escalation
4. Check-in assistance
5. Invalid payload validation
6. Invalid API key access
7. Rate limiting behavior

---

# Design Decisions

## Why Unified Schema?

Different booking and messaging platforms have inconsistent payload structures.

A unified schema ensures:

- cleaner downstream processing
- consistent AI prompting
- easier analytics
- scalable architecture

---

## Why Separate AI Metadata Table?

AI metadata was separated from the core messages table to:

- improve scalability
- avoid message table bloat
- support future AI systems
- enable audit logging and analytics

This design also supports future multi-model orchestration and agent review pipelines.

---

## Why Keyword-Based Classification?

For the scope of this assessment, deterministic keyword classification provides:

- predictable behavior
- low latency
- easy debugging
- reliable outputs

In production, this could be replaced with LLM-based intent classification or hybrid NLP pipelines.

---

# Future Improvements

Potential production improvements:

- Redis caching
- sentiment analysis
- semantic retrieval
- vector database integration
- multi-property AI context retrieval
- webhook retry queues
- background job workers
- observability and tracing
- role-based admin dashboard
- human-in-the-loop moderation

---

# Author

[Jeet Das](https://github.com/JeetDas5)