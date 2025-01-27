# Peer-to-Peer Rental Platform Backend

A RESTful API backend service for a peer-to-peer rental platform where users can list, rent, and return items like tools, gadgets, or books.

## Overview

This API provides endpoints to manage rental items, including listing items for rent, searching available items, managing rentals, and handling returns. It uses an in-memory database for simplicity and easy prototyping.

## Features

- List items for rent with details (name, description, price)
- Search available items by name or price range — Allows filtering of items by name or price range, helping users find relevant items for rent
- View all items, not just available ones — Returns a list of all items (including rented ones), providing an overview of the entire inventory
- Rent items for specific date ranges
- Return items and mark them as available
- View rental history for specific items
- Delete items from the platform

## Technical Architecture

### Database
- Currently uses an in-memory database (array) for data storage
- Designed for easy migration to a permanent database solution
- Maintains data consistency for concurrent operations

### API Design
- RESTful architecture
- JSON request/response format
- Proper error handling and validation
- Modular and extensible codebase

## API Endpoints

### Items Management

#### Add a New Item
```
POST /api/items
```
Request body:
```json
{
    "name": "Power Drill",
    "description": "Professional grade power drill",
    "pricePerDay": 5.00,
    "availability": true
}
```

#### Get All Items
```
GET /api/items/allItems
```

#### Search Items
```
GET /api/items?name=Power Drill&minPrice=10&maxPrice=50
```
Query parameters:
- `name`: Search by item name (optional)
- `minPrice`: Minimum price per day (optional)
- `maxPrice`: Maximum price per day (optional)

#### Delete Item
```
DELETE /api/items/:id
```

### Rental Management

#### Rent an Item
```
POST /api/items/:id/rent
```
Request body:
```json
{
    "startDate": "2025-02-01",
    "endDate": "2025-02-05",
    "renterName": "Ben"
}
```

#### Return an Item
```
POST /api/items/:id/return
```

#### View Rental History
```
GET /api/items/:id/rentals
```

## Error Handling

The API implements comprehensive error handling for common scenarios:

- Invalid item IDs
- Missing required fields
- Invalid date ranges
- Overlapping rental periods
- Item availability conflicts

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd peer-to-peer-rental-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start running on `http://localhost:3000`

## Testing

### Using cURL

1. Add a new item:
```bash
curl -X POST http://localhost:3000/api/items \
-H "Content-Type: application/json" \
-d '{"name":"Power Drill", "description":"Professional grade power drill", "pricePerDay":5.00, "availability":true}'
```

2. Search for items:
```bash
curl "http://localhost:3000/api/items?name=drill&minPrice=20&maxPrice=30"
```

3. Rent an item:
```bash
curl -X POST http://localhost:3000/api/items/1/rent \
-H "Content-Type: application/json" \
-d '{"startDate":"2025-02-01", "endDate":"2025-02-05", "renterName":"John Doe"}'
```

### Using Postman

Import the following endpoints into Postman:

1. Create a new request for each endpoint
2. Set the appropriate HTTP method
3. Set the URL to `http://localhost:3000/api/items` (adjust path as needed)
4. Add required headers and body content
5. Send requests to test functionality

## Future Improvements

1. **Authentication & Authorization**
   - User registration and login
   - JWT token-based authentication

2. **Database Integration**
   - Migration to PostgreSQL or MongoDB
   - Data persistence
   - Proper indexing for better performance


