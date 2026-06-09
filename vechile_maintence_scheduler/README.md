# Vehicle Maintenance Scheduler

A backend microservice built using **Node.js**, **Express.js**, and **Axios** to optimize vehicle maintenance scheduling based on available mechanic hours and task impact.

## Overview

This service fetches vehicle maintenance tasks from protected APIs and determines the optimal set of maintenance jobs that maximize operational impact while staying within the available maintenance-hour budget.

The optimization is implemented using the **0/1 Knapsack Dynamic Programming Algorithm**.

---

## Tech Stack

* Node.js
* Express.js
* Axios
* dotenv
* Dynamic Programming (0/1 Knapsack)

---

## Project Structure

```text
src/
├── middleware/
│   └── logging.middleware.js
│
├── routes/
│   └── schedule.routes.js
│
├── services/
│   ├── api.service.js
│   └── scheduler.service.js
│
├── app.js
└── server.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/shrutisgh/2300320100243.git
```

Move to the project directory:

```bash
cd vechile_maintence_scheduler
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
API_TOKEN=YOUR_API_TOKEN
```

---

## Running the Application

Start the server:

```bash
npm start
```

or

```bash
node src/server.js
```

Server will run at:

```text
http://localhost:3000
```

---

## API Endpoint

### Get Optimized Maintenance Schedule

**Request**

```http
GET /api/schedule?hours=10
```

**Query Parameters**

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| hours     | Number | Available mechanic hours |

---

## Sample Response

```json
{
  "maxImpact": 15,
  "selectedTasks": [
    {
      "TaskID": "264e638f-1c7a-4d67-9f9c-53f3d1766d37",
      "Duration": 2,
      "Impact": 5
    }
  ]
}
```

---

## Algorithm Used

### 0/1 Knapsack

Mapping:

| Scheduling Problem | Knapsack Problem |
| ------------------ | ---------------- |
| Duration           | Weight           |
| Impact             | Value            |
| Available Hours    | Capacity         |

The algorithm selects the combination of maintenance tasks that yields the highest total impact without exceeding the available maintenance hours.

### Complexity

**Time Complexity**

```text
O(N × H)
```

**Space Complexity**

```text
O(N × H)
```

Where:

* N = Number of maintenance tasks
* H = Available mechanic hours

---

## Features

* Fetches protected API data using Axios
* Environment variable support using dotenv
* Modular Express architecture
* Dynamic Programming optimization
* Error handling
* Request logging middleware

---


