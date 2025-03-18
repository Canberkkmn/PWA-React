# PWA React Weather App

## Overview

This project is a **Progressive Web App (PWA)** built with React. It provides weather forecasts and supports offline usage through Service Workers and caching mechanisms.

## Features

- **Progressive Web App** with installable capabilities
- **Fetches real-time weather data** using an API
- **Offline Support** via Service Workers
- **Optimized performance** using caching strategies
- **Responsive UI** built with React

## Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/pwa-react-weather.git
   cd pwa-react-weather
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm start
   ```
   This will start the app at `http://localhost:3000/`.

## PWA Functionality

This app supports **offline usage** using a **Service Worker (`sw.js`)**, which caches essential resources like:

- `index.html`
- `offline.html` (for fallback)
- `manifest.json`
- Images

### Service Worker Behavior

- During **installation**, the service worker caches required assets.
- During **fetch requests**, it first tries to fetch fresh data. If offline, it serves cached content.

## Project Structure

```
pwa-react/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── offline.html
│   ├── sw.js
│   └── images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
├── package.json
├── README.md
```

## Used Caching Strategy

This project implements the following caching strategies:

**Cache First**: Used for static assets like images, manifest.json, and offline.html to ensure quick load times.

**Network First**: Used for dynamic API requests to fetch fresh data when online, but falls back to cached responses if offline.

**Stale-While-Revalidate**: Ensures the user gets fast cached responses while simultaneously fetching the latest updates from the network.

## Push Notifications

When user searches for a weather, we also send push notification.

## License

This project is licensed under the MIT License.
