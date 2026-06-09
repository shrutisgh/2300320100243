# Stage 1

## APIs

GET /notifications

GET /notifications/{id}

PATCH /notifications/{id}/read

POST /notifications

DELETE /notifications/{id}

## Real Time

WebSocket

/ws/notifications

# Stage 2

## Database

PostgreSQL

notifications

(id,
student_id,
type,
message,
is_read,
created_at)

Composite Index:

(student_id,is_read,created_at)

# Stage 3

Query:

SELECT *
FROM notifications
WHERE student_id=1042
AND is_read=false
ORDER BY created_at DESC;

Index:

CREATE INDEX idx_student_read_created
ON notifications(
student_id,
is_read,
created_at DESC
);

Complexity:
O(log n)

# Stage 4

Redis Cache

Student
↓
Redis
↓
PostgreSQL

# Stage 5

Kafka Event Driven Design

Producer
↓
Kafka

Consumers:
- Email
- Push
- DB

# Stage 6

Priority Inbox

Placement = 100

Result = 70

Event = 40

Sort by:
1. Priority
2. Timestamp

Return Top 10