# Background Removal API Documentation

## Overview
The Background Removal API is a service that removes backgrounds from product images for e-commerce platforms. It accepts image URLs and bounding box coordinates, processes the images to remove backgrounds, and returns the processed images with transparent backgrounds.

## Table of Contents
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment-guide)
- [Testing](#testing)
- [Postman Collection](#postman-collection)

## Technical Stack

### Core Technologies
- Node.js (v14+)
- Express.js - Web framework
- AWS SDK - For S3 storage integration
- Remove.bg API - For background removal processing

### Dependencies
- `express` - Web server framework
- `aws-sdk` - AWS services integration
- `axios` - HTTP client
- `dotenv` - Environment configuration
- `joi` - Request validation
- `multer` - File upload handling
- `remove.bg` - Background removal service
- `winston` - Logging

### Development Dependencies
- `jest` - Testing framework
- `nodemon` - Development server
- `supertest` - API testing

## Project Structure
```
.
├── src/
│   ├── controllers/
│   │   └── imageController.js    # Image processing controller
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handling
│   │   └── validateRequest.js    # Request validation
│   ├── routes/
│   │   └── index.js             # API routes
│   ├── services/
│   │   ├── backgroundRemoval.js  # Background removal logic
│   │   └── storage.js           # S3 storage operations
│   ├── utils/
│   │   └── logger.js            # Logging configuration
│   ├── validators/
│   │   └── imageValidator.js    # Input validation schemas
│   └── server.js                # Application entry point
├── tests/
│   └── image.test.js            # API tests
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
1. Node.js (v14 or higher)
2. AWS Account with S3 bucket
3. Remove.bg API key
4. Git

### Local Development Setup
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd background-removal-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your credentials:
   ```
   PORT=3000
   REMOVE_BG_API_KEY=your_remove_bg_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET=your_s3_bucket_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Remove Background Endpoint

**Endpoint:** `POST /api/remove-background`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "image_url": "https://example.com/image.jpg",
    "bounding_box": {
        "x_min": 0,
        "y_min": 0,
        "x_max": 100,
        "y_max": 100
    }
}
```

**Success Response (200 OK):**
```json
{
    "original_image_url": "https://example.com/image.jpg",
    "processed_image_url": "https://your-bucket.s3.region.amazonaws.com/processed-image.png"
}
```

**Error Response (400 Bad Request):**
```json
{
    "error": "Invalid image URL format"
}
```

### Sample Test Images

| Product | Image URL | Suggested Coordinates |
|---------|-----------|----------------------|
| Sofa | [Link](https://plus.unsplash.com/premium_photo-1681449856688-2abd99ab5a73) | `{"x_min": 100, "y_min": 200, "x_max": 800, "y_max": 600}` |
| Jacket | [Link](https://plus.unsplash.com/premium_photo-1675186049563-000f7ac02c44) | `{"x_min": 200, "y_min": 100, "x_max": 700, "y_max": 900}` |
| Oil Bottle | [Link](https://images.unsplash.com/photo-1549049950-48d5887197a0) | `{"x_min": 300, "y_min": 150, "x_max": 500, "y_max": 800}` |
| Car | [Link](https://images.unsplash.com/photo-1469285994282-454ceb49e63c) | `{"x_min": 150, "y_min": 200, "x_max": 900, "y_max": 600}` |

## Deployment Guide

### AWS Deployment Steps

1. Create an EC2 instance:
   - Choose Ubuntu Server 20.04 LTS
   - Configure security groups to allow HTTP/HTTPS traffic
   - Generate and download SSH key pair

2. SSH into your instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. Install Node.js and npm:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. Clone and setup the application:
   ```bash
   git clone [repository-url]
   cd background-removal-api
   npm install
   ```

5. Setup environment variables:
   ```bash
   cp .env.example .env
   nano .env   # Edit with your credentials
   ```

6. Install PM2 for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start src/server.js
   pm2 startup
   ```

### API Endpoint
The API is accessible at: `http://your-domain/api/remove-background`

## Testing

Run the test suite:
```bash
npm test
```

The tests cover:
- Input validation
- API endpoint functionality
- Error handling
- Image processing workflow

## Postman Collection

[Download Postman Collection](link-to-your-postman-collection)

### Example Request
```json
{
    "image_url": "https://example.com/product.jpg",
    "bounding_box": {
        "x_min": 100,
        "y_min": 100,
        "x_max": 500,
        "y_max": 600
    }
}
```

### Environment Variables
```json
{
    "BASE_URL": "http://your-api-domain",
    "API_KEY": "your-api-key"
}
```

## Error Handling

The API implements comprehensive error handling for:
- Invalid input validation
- Image processing failures
- Storage errors
- Network issues

Error responses follow a consistent format:
```json
{
    "error": "Descriptive error message"
}
```

## Logging

Logs are stored in:
- `error.log`: Error-level logs
- `combined.log`: All logs

Log format:
```json
{
    "timestamp": "2024-01-01T00:00:00.000Z",
    "level": "error",
    "message": "Error details"
}
```#   B a c k g r o u n d _ r e m o v e r _ a p i 
 
 
