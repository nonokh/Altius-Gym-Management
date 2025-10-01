# Altius Gym Management System - API Documentation

Base URL: `http://localhost:5000/api` (development)

All API endpoints require authentication except for login and register.
Include JWT token in Authorization header: `Bearer <token>`

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@altius.gym",
  "password": "admin123"
}

Response 200:
{
  "_id": "...",
  "name": "Admin",
  "email": "admin@altius.gym",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Register New User
```http
POST /api/auth/register
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"
}

Response 201:
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "staff",
  "token": "..."
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "_id": "...",
  "name": "Admin",
  "email": "admin@altius.gym",
  "role": "admin",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Members

### Get All Members
```http
GET /api/members?search=john&status=active&page=1&limit=10
Authorization: Bearer <token>

Response 200:
{
  "members": [
    {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "dateOfBirth": "1990-01-01T00:00:00.000Z",
      "gender": "male",
      "status": "active",
      "membershipPlan": {
        "_id": "...",
        "name": "Monthly Basic",
        "price": 999
      },
      "membershipStartDate": "2024-01-01T00:00:00.000Z",
      "membershipEndDate": "2024-02-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

### Get Member By ID
```http
GET /api/members/:id
Authorization: Bearer <token>

Response 200:
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  ...
}
```

### Create Member
```http
POST /api/members
Content-Type: application/json
Authorization: Bearer <token>

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "gender": "female",
  "status": "active",
  "membershipPlan": "plan_id_here",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "emergencyContact": {
    "name": "John Smith",
    "phone": "+1234567891",
    "relationship": "Spouse"
  }
}

Response 201:
{
  "_id": "...",
  "firstName": "Jane",
  "lastName": "Smith",
  ...
}
```

### Update Member
```http
PUT /api/members/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "inactive",
  "phone": "+1234567899"
}

Response 200:
{
  "_id": "...",
  "firstName": "Jane",
  "lastName": "Smith",
  "status": "inactive",
  "phone": "+1234567899",
  ...
}
```

### Delete Member
```http
DELETE /api/members/:id
Authorization: Bearer <token>

Response 200:
{
  "message": "Member removed"
}
```

### Get Member Statistics
```http
GET /api/members/stats/overview
Authorization: Bearer <token>

Response 200:
{
  "total": 150,
  "active": 120,
  "inactive": 20,
  "expired": 10
}
```

## Membership Plans

### Get All Plans
```http
GET /api/plans?isActive=true
Authorization: Bearer <token>

Response 200:
[
  {
    "_id": "...",
    "name": "Monthly Basic",
    "description": "Access to gym facilities for 1 month",
    "duration": 1,
    "durationType": "months",
    "price": 999,
    "features": [
      "Gym access during operating hours",
      "Basic equipment usage",
      "Locker facility"
    ],
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Plan By ID
```http
GET /api/plans/:id
Authorization: Bearer <token>

Response 200:
{
  "_id": "...",
  "name": "Monthly Basic",
  ...
}
```

### Create Plan (Admin Only)
```http
POST /api/plans
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "name": "Premium Annual",
  "description": "One year premium membership",
  "duration": 1,
  "durationType": "years",
  "price": 9999,
  "features": [
    "24/7 access",
    "Personal trainer",
    "Nutrition consultation"
  ],
  "isActive": true
}

Response 201:
{
  "_id": "...",
  "name": "Premium Annual",
  ...
}
```

### Update Plan (Admin Only)
```http
PUT /api/plans/:id
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "price": 10999,
  "isActive": false
}

Response 200:
{
  "_id": "...",
  "price": 10999,
  "isActive": false,
  ...
}
```

### Delete Plan (Admin Only)
```http
DELETE /api/plans/:id
Authorization: Bearer <admin-token>

Response 200:
{
  "message": "Plan removed"
}
```

## Attendance

### Get Attendance Records
```http
GET /api/attendance?memberId=...&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=20
Authorization: Bearer <token>

Response 200:
{
  "attendance": [
    {
      "_id": "...",
      "member": {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "checkInTime": "2024-01-15T08:00:00.000Z",
      "checkOutTime": "2024-01-15T10:00:00.000Z",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T08:00:00.000Z"
    }
  ],
  "totalPages": 3,
  "currentPage": 1,
  "total": 60
}
```

### Check In Member
```http
POST /api/attendance/checkin
Content-Type: application/json
Authorization: Bearer <token>

{
  "memberId": "member_id_here"
}

Response 201:
{
  "_id": "...",
  "member": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "checkInTime": "2024-01-15T08:00:00.000Z",
  "date": "2024-01-15T00:00:00.000Z"
}
```

### Check Out Member
```http
PUT /api/attendance/checkout/:id
Authorization: Bearer <token>

Response 200:
{
  "_id": "...",
  "member": {...},
  "checkInTime": "2024-01-15T08:00:00.000Z",
  "checkOutTime": "2024-01-15T10:00:00.000Z",
  "date": "2024-01-15T00:00:00.000Z"
}
```

### Get Today's Attendance Count
```http
GET /api/attendance/today/count
Authorization: Bearer <token>

Response 200:
{
  "count": 45,
  "date": "2024-01-15T00:00:00.000Z"
}
```

## Payments

### Get All Payments
```http
GET /api/payments?memberId=...&status=completed&startDate=2024-01-01&page=1&limit=20
Authorization: Bearer <token>

Response 200:
{
  "payments": [
    {
      "_id": "...",
      "member": {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "membershipPlan": {
        "_id": "...",
        "name": "Monthly Basic",
        "price": 999
      },
      "amount": 999,
      "paymentDate": "2024-01-15T00:00:00.000Z",
      "paymentMethod": "cash",
      "status": "completed",
      "transactionId": "",
      "notes": "",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

### Get Payment By ID
```http
GET /api/payments/:id
Authorization: Bearer <token>

Response 200:
{
  "_id": "...",
  "member": {...},
  "membershipPlan": {...},
  "amount": 999,
  ...
}
```

### Create Payment
```http
POST /api/payments
Content-Type: application/json
Authorization: Bearer <token>

{
  "member": "member_id_here",
  "membershipPlan": "plan_id_here",
  "amount": 999,
  "paymentMethod": "card",
  "status": "completed",
  "transactionId": "TXN123456",
  "notes": "Payment for monthly membership"
}

Response 201:
{
  "_id": "...",
  "member": {...},
  "membershipPlan": {...},
  "amount": 999,
  "paymentMethod": "card",
  "status": "completed",
  ...
}
```

### Update Payment
```http
PUT /api/payments/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "refunded",
  "notes": "Membership cancelled"
}

Response 200:
{
  "_id": "...",
  "status": "refunded",
  "notes": "Membership cancelled",
  ...
}
```

### Delete Payment
```http
DELETE /api/payments/:id
Authorization: Bearer <token>

Response 200:
{
  "message": "Payment removed"
}
```

### Get Payment Statistics
```http
GET /api/payments/stats/overview?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>

Response 200:
{
  "totalRevenue": 125000,
  "transactionCount": 150
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, token failed"
}
```

### 403 Forbidden
```json
{
  "message": "User role 'staff' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Member not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message",
  "stack": "..." // Only in development
}
```

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. Currency amounts are in smallest unit (e.g., paise for INR)
3. Dates should be sent in YYYY-MM-DD format
4. Pagination defaults: page=1, limit=10
5. Maximum limit per request: 100
6. Token expires after 7 days by default
