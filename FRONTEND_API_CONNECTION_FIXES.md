# Frontend API Connection Fixes

## Issue Summary

The frontend was not properly connecting to the backend API. This was caused by a port mismatch between the Vite configuration and the actual running port.

## Root Causes Identified

### 1. Port Mismatch

-   **Vite Configuration**: Port 8081
-   **Actual Running Port**: Port 8082 (due to port 8081 being in use)
-   **Impact**: API client using absolute URLs was connecting to wrong port

### 2. API Client Configuration

-   **Issue**: API client was using absolute URLs instead of relative URLs for proxy support
-   **Impact**: Bypassed Vite proxy, causing CORS issues in development

## Fixes Implemented

### 1. Vite Configuration Update

**File**: `vite.config.ts`

-   Updated port from 8081 to 8082 to match actual running port
-   Maintained proxy configuration for `/api` routes

```typescript
server: {
  host: "::",
  port: 8082, // Updated from 8081
  proxy: {
    "/api": {
      target: process.env.VITE_API_URL || "http://localhost:5000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, "/api"),
    },
  },
}
```

### 2. API Client Configuration Fix

**File**: `src/lib/api.ts`

-   Modified `API_BASE_URL` to use relative URLs in development
-   Maintained absolute URLs in production for proper deployment

```typescript
const API_BASE_URL =
	import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_API_URL || "http://localhost:5000"
```

### 3. Proxy Configuration

**File**: `vite.config.ts`

-   Maintained existing proxy configuration for `/api` routes
-   Ensures all API requests are forwarded to backend server

```typescript
proxy: {
  "/api": {
    target: process.env.VITE_API_URL || "http://localhost:5000",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, "/api"),
  },
}
```

## Verification Steps

### 1. Service Status Check

```bash
# Check Docker services
docker-compose -f docker-compose.dev.yml ps

# Should show:
# - mogiapp-mysql-dev (running)
# - mogiapp-server-dev (running)
```

### 2. Frontend Status Check

```bash
# Frontend should be running on port 8082
curl http://localhost:8082

# Should return HTML content
```

### 3. API Connection Test

```bash
# Test direct API access
curl http://localhost:5000/api/blogs

# Test proxied API access
curl http://localhost:8082/api/blogs

# Both should return blog data
```

### 4. Frontend-Backend Integration Test

```bash
# Test that frontend can access backend through proxy
# Open browser to http://localhost:8082
# Navigate to blog or product pages
# Content should load without CORS errors
```

## Current Working Configuration

### Development Environment

-   **Frontend**: http://localhost:8082
-   **Backend API**: http://localhost:5000
-   **Database**: MySQL in Docker on port 3307
-   **API Access**: Via Vite proxy at `/api/*`

### Production Environment

-   **Frontend**: Served by web server
-   **Backend API**: Configured via `VITE_API_URL` environment variable
-   **Database**: MySQL
-   **API Access**: Direct to backend server

## Best Practices Implemented

### 1. Environment-Specific Configuration

-   Use relative URLs in development for proxy support
-   Use absolute URLs in production for direct access
-   Leverage Vite's `import.meta.env.MODE` for environment detection

### 2. Proxy Configuration

-   Centralized API routing through Vite proxy
-   Eliminates CORS issues in development
-   Simplifies frontend API calls

### 3. Error Handling

-   Comprehensive error handling in API client
-   User-friendly error messages
-   Console logging for debugging

## Testing Results

### ✅ Verified Working

-   Frontend running on http://localhost:8082
-   Backend API accessible at http://localhost:5000
-   Vite proxy forwarding `/api/*` requests to backend
-   Blog and product data loading correctly
-   No CORS errors in browser console

### ✅ API Endpoints Working

-   `GET /api/blogs` - Returns blog list
-   `GET /api/products` - Returns product list
-   `GET /api/blogs/:id` - Returns specific blog
-   `GET /api/products/:id` - Returns specific product

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Port Conflicts

**Issue**: "Port already in use" error
**Solution**: Vite automatically selects next available port
**Fix**: Update `vite.config.ts` port to match actual running port

#### 2. CORS Errors

**Issue**: Browser blocks API requests
**Solution**: Use Vite proxy configuration
**Fix**: Ensure API calls use relative URLs (`/api/...`)

#### 3. API Connection Failures

**Issue**: "Failed to fetch" errors
**Solution**: Check service status and proxy configuration
**Fix**:

1. Verify backend is running (`docker-compose -f docker-compose.dev.yml ps`)
2. Check Vite proxy configuration
3. Ensure API client uses correct base URL

#### 4. Environment Variables

**Issue**: Incorrect API URL
**Solution**: Check `.env` file configuration
**Fix**: Ensure `VITE_API_URL` is set correctly for production

## Future Improvements

### 1. Enhanced Error Handling

-   Add retry logic for failed API requests
-   Implement request timeout handling
-   Add offline detection and user notifications

### 2. API Client Enhancements

-   Add request/response logging in development
-   Implement request caching for improved performance
-   Add API versioning support

### 3. Monitoring and Analytics

-   Add API request/response time monitoring
-   Implement error tracking and reporting
-   Add usage analytics for API endpoints

## Files Modified

1. **`vite.config.ts`** - Updated port configuration
2. **`src/lib/api.ts`** - Fixed API base URL configuration
3. **`src/api-test.ts`** - Created API connectivity test utility

## Commands for Verification

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d mysql server
npm run dev

# Test API connectivity
curl http://localhost:8082/api/blogs

# Check service status
docker-compose -f docker-compose.dev.yml ps
```
