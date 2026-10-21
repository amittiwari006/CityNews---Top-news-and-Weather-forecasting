# 🌤️ SkyPulse — Offline Weather & Local News Hub

SkyPulse is an offline-capable Progressive Web Application (PWA) built with pure HTML, modern CSS, and vanilla JavaScript. It retrieves real-time weather forecasts and local headlines for any city and automatically caches them so the app continues to work seamlessly even without an internet connection.

---

## 🚀 Features

- **Real-time Weather & Local News**: Powered by [WeatherAPI](https://weatherapi.com) and [NewsData.io](https://newsdata.io).
- **100% Offline Capable**:
  - **Service Worker (`sw.js`)**: Pre-caches the application shell so the website opens instantly offline.
  - **LocalStorage Fallback**: All searched cities, forecasts, and news headlines are automatically saved locally with timestamps.
  - **Saved Offline Articles**: Bookmark any news story to read full snippets offline anytime.
- **Smart Connection Detection**: Automatic online/offline indicator banner with reconnect sync.
- **Weather Details**:
  - Current temperature with °C and °F instant toggle.
  - Feels like temperature, humidity, wind speed & direction, UV index, air pressure, visibility, and rain probability.
  - 24-hour hourly forecast scroll track.
  - 3-day upcoming forecast cards.
- **News Features**:
  - Localized headlines for the searched city.
  - Category filters: All, Top, Business, Tech, Sports.
  - Responsive cards with image fallback and relative publishing times.
- **Zero Heavy External Dependencies**: Pure SVG icons and native system fonts — no CDN failures when offline.
- **Dark & Light Modes**: Seamless theme switching saved to user preferences.

---

## 📁 File Structure

```text
weather-news-app/
├── index.html       # Semantic HTML layout and UI components
├── style.css        # Responsive CSS with CSS variables, Glassmorphism & Themes
├── app.js           # API integration, offline caching engine, and UI renderer
├── sw.js            # PWA Service Worker for offline caching
├── manifest.json    # Web App Manifest for installable PWA
└── README.md        # Documentation and VS Code run instructions
```

---

## 💻 How to Run in Visual Studio Code

Because Service Workers (`sw.js`) require a local web server environment (browsers block Service Workers on direct `file:///` URLs for security), follow these simple steps in VS Code:

### Option 1: Using VS Code Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder...** and select `C:\Users\salon\.gemini\antigravity\scratch\weather-news-app`.
3. If you haven't already, install the **Live Server** extension:
   - Press `Ctrl + Shift + X` to open Extensions.
   - Search for **Live Server** (by *Ritwick Dey*) and click **Install**.
4. Right-click on `index.html` in the file explorer and click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
5. The dashboard will automatically open in your browser at `http://127.0.0.1:5500`.

### Option 2: Using Built-in Terminal in VS Code
1. Open the project folder in VS Code.
2. Open the integrated terminal (`Ctrl + \``).
3. Run either:
   ```bash
   # If you have Python:
   python -m http.server 3000
   ```
   or
   ```bash
   # If you have Node.js / npx:
   npx serve .
   ```
4. Open `http://localhost:3000` in your web browser.

---

## ⚡ Testing Offline Mode

1. Open the site in Google Chrome, Edge, or Firefox.
2. Search a few cities (e.g. *London*, *New York*, *Tokyo*, *Paris*).
3. Save an article by clicking the bookmark icon on any news card.
4. Open DevTools (`F12`), switch to the **Network** tab, and select **"Offline"** in the throttling dropdown (or disconnect your Wi-Fi).
5. Refresh the page:
   - Notice that the site loads completely with a **⚡ Offline Mode** banner.
   - Click between your previously searched cities using the **Quick Places** chips.
   - Open your **Saved Offline Articles** modal to read saved stories without internet.
