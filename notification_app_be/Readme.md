# Campus Notification Microservice

A scalable notification platform built using **Node.js** and **Express.js** for delivering real-time campus updates such as:

- 📢 Placement Notifications
- 🎓 Result Notifications
- 🎉 Event Notifications

This project is developed as part of the **AffordMed Campus Notification Microservice Assessment**.

---

# Project Overview

The system allows students to receive important notifications and prioritizes them based on their importance.

Priority Order:

1. Placement
2. Result
3. Event

If multiple notifications have the same priority, the latest notification is displayed first.

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| Axios | External API Calls |
| PostgreSQL | Database Design (Stage 2) |
| Redis | Caching Strategy (Stage 4) |
| Kafka | Event Processing Strategy (Stage 5) |
| Git & GitHub | Version Control |

---

# Project Structure

```text
campus-notification-microservice/
│
├── src/
│   ├── app.js
│   │
│   ├── routes/
│   │   └── notificationRoutes.js
│   │
│   ├── controllers/
│   │   └── notificationController.js
│   │
│   ├── services/
│   │   ├── affordmedService.js
│   │   └── priorityService.js
│   │
│   └── utils/
│       └── priorityWeights.js
│
├── docs/
│   └── Notification_System_Design.md
│
├── screenshots/
│
├── README.md
├── package.json
└── .gitignore
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd campus-notification-microservice
```

Install dependencies:

```bash
npm install
```

---

# Running the Project

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Server will start on:

```text
http://localhost:8080
```

---

# API Endpoint

## Get Priority Notifications

### Request

```http
GET /api/v1/notifications/priority
```

### Success Response

```json
{
  "count": 10,
  "data": [
    {
      "ID": "123",
      "Type": "Placement",
      "Message": "Microsoft Hiring",
      "Timestamp": "2026-04-22 17:51:18"
    }
  ]
}
```

---

# Notification Priority Logic

The Priority Inbox ranks notifications using predefined weights.

| Notification Type | Priority Weight |
|-------------------|----------------|
| Placement | 100 |
| Result | 70 |
| Event | 40 |

Sorting Rules:

1. Higher priority first
2. Latest timestamp first

Example:

```text
Placement > Result > Event
```

---

# Stage 1 - REST API Design

Implemented API contracts for:

- Get Notifications
- Get Notification By ID
- Create Notification
- Mark Notification Read
- Delete Notification

Real-time updates are designed using WebSocket architecture.

---

# Stage 2 - Database Design

Recommended Database:

```text
PostgreSQL
```

Schema:

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id BIGINT NOT NULL,
    type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Indexes:

```sql
CREATE INDEX idx_student_read_created
ON notifications(student_id, is_read, created_at DESC);
```

---

# Stage 3 - Query Optimization

Original Query:

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY created_at DESC;
```

Optimization:

```sql
CREATE INDEX idx_student_read_created
ON notifications(
student_id,
is_read,
created_at DESC
);
```

Benefits:

- Faster filtering
- Faster sorting
- Reduced full table scans

---

# Stage 4 - Performance Improvements

Recommended Solution:

```text
Student
   ↓
Express API
   ↓
Redis Cache
   ↓
PostgreSQL
```

Benefits:

- Reduced database load
- Faster API responses
- Better scalability

Trade-offs:

- Cache invalidation complexity
- Additional infrastructure

---

# Stage 5 - Scalable Notification Delivery

Instead of processing notifications sequentially:

```javascript
sendEmail();
saveToDatabase();
sendPushNotification();
```

Use Event-Driven Architecture:

```text
Notification Service
        ↓
      Kafka
        ↓
 ┌─────────────┐
 │ Email Worker│
 ├─────────────┤
 │ Push Worker │
 ├─────────────┤
 │ DB Worker   │
 └─────────────┘
```

Advantages:

- High throughput
- Retry mechanism
- Fault tolerance
- Horizontal scaling

---

# Stage 6 - Priority Inbox

Notifications are fetched from the AffordMed Notification API.

The service:

1. Retrieves notifications
2. Assigns priority scores
3. Sorts by priority and recency
4. Returns top 10 notifications

Current Complexity:

```text
O(N log N)
```

Production Optimization:

```text
Min Heap (Size 10)

O(N log 10)

≈ O(N)
```

---

# Future Enhancements

- JWT Authentication
- Redis Integration
- Kafka Integration
- Docker Support
- Docker Compose
- Swagger API Documentation
- Unit Testing
- CI/CD Pipeline

---

# Screenshots

Screenshots of API execution and Stage 6 output are available in:

```text
/screenshots
```

---

# Author

Shruti Singh

AffordMed Campus Notification Microservice Assessment