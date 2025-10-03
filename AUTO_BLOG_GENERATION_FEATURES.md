# Auto Blog Generation Features Implementation

## Overview

This document describes the implementation of auto blog generation features for the MogiApp CMS, which allows automatic creation of blog posts from RSS feeds and other sources.

## Features Implemented

### 1. RSS Service for Blog Generation

-   **File**: `server/services/rssService.js`
-   **Functionality**:
    -   Fetch and parse RSS feeds from various sources
    -   Convert RSS items to blog post format
    -   Extract images from RSS content
    -   Create or update blog posts in the database
    -   Process multiple RSS feeds simultaneously
    -   Handle errors gracefully and continue processing

### 2. Scheduled Tasks

-   **File**: `server/services/scheduledTasks.js`
-   **Functionality**:
    -   Daily blog generation from RSS feeds at 2:00 AM
    -   Weekly cleanup of old task logs at 3:00 AM on Sundays
    -   Task logging to database for monitoring
    -   Error handling and reporting

### 3. API Endpoints

-   **File**: `server/routes/apiRoutes.js`
-   **New Endpoint**: `POST /api/external/generate-blogs`
-   **Functionality**:
    -   Generate blog posts from provided RSS sources
    -   Protected by authentication middleware
    -   Returns detailed results of the generation process

### 4. Database Schema Updates

-   **File**: `server/prisma/schema.prisma`
-   **Changes**:
    -   Added `externalUrl` field to Blog model for tracking source URLs
    -   Added `publishedAt` field to Blog model for publication dates
    -   Added `apiKey` field to User model for API key storage
    -   Added new TaskLog model for task logging

### 5. Frontend Integration

-   **File**: `src/components/admin/ApiManagement.tsx`
-   **Enhancements**:
    -   Added "Generate Blogs" button to manually trigger blog generation
    -   Added statistics display for active sources, generated posts, and success rate
    -   Improved UI with loading indicators
    -   Real-time updates of statistics

## How It Works

### 1. Setting Up RSS Sources

1. Navigate to the API Management section in the admin panel
2. Enable "Auto Blog Generation"
3. Add RSS sources with name and URL
4. Toggle sources on/off as needed

### 2. Generating Blogs

1. Click "Generate Blogs" to manually trigger blog generation
2. Or wait for the scheduled daily task to run automatically
3. View results in the toast notifications
4. Check statistics for success rates and counts

### 3. Technical Details

-   Uses `rss-parser` library for RSS feed parsing
-   Implements deduplication by checking external URLs
-   Handles various RSS feed formats and content structures
-   Stores task logs for monitoring and debugging
-   Secured with API key authentication

## Future Enhancements

1. Add support for more content sources (not just RSS)
2. Implement content filtering and categorization
3. Add scheduling options for different frequencies
4. Improve image handling and optimization
5. Add content validation and sanitization
6. Implement webhook notifications for generation events
7. Add dashboard widgets for monitoring blog generation metrics

## API Documentation

### Generate Blogs Endpoint

```
POST /api/external/generate-blogs
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "sources": [
    {
      "name": "TechCrunch",
      "url": "https://techcrunch.com/feed/",
      "active": true
    }
  ]
}
```

### Response

```json
{
  "message": "Blog generation completed",
  "results": {
    "totalProcessed": 10,
    "successful": 8,
    "failed": 2,
    "errors": [...],
    "posts": [...]
  }
}
```
