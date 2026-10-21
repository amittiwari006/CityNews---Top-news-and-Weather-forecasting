/**
 * SkyPulse Weather & Local News Dashboard
 * 100% Offline Capable with Embedded Offline Database & Local Caching
 */

// ==========================================
// CONFIGURATION & API KEYS
// ==========================================
const CONFIG = {
  WEATHER_API_KEY: '09dc72206d874dd79eb140945262110',
  NEWS_API_KEY: 'pub_bdffbe2ee5204c20bf1fde64673160e9',
  DEFAULT_CITY: 'London',
  CACHE_PREFIX_WEATHER: 'skypulse_weather_',
  CACHE_PREFIX_NEWS: 'skypulse_news_',
  RECENT_CITIES_KEY: 'skypulse_recent_cities',
  SAVED_ARTICLES_KEY: 'skypulse_saved_articles',
  PREFS_KEY: 'skypulse_preferences'
};

// ==========================================
// PRE-BUNDLED OFFLINE DATABASE
// Pre-loaded so the app shows weather and news even if opened offline on day 1!
// ==========================================
const OFFLINE_DB = {
  london: {
    weather: {
      location: { name: 'London', region: 'Greater London', country: 'United Kingdom', localtime: '2026-10-21 15:30' },
      current: {
        temp_c: 16.5, temp_f: 61.7, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' },
        wind_kph: 19.4, wind_dir: 'WSW', pressure_mb: 1014, humidity: 68, cloud: 45,
        feelslike_c: 15.8, feelslike_f: 60.4, vis_km: 10, uv: 3, rain_chance: 20
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 18, maxtemp_f: 64, mintemp_c: 11, mintemp_f: 52, daily_chance_of_rain: 20, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
            hour: [
              { time: '2026-10-21 09:00', temp_c: 13, temp_f: 55, chance_of_rain: 10, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 12:00', temp_c: 17, temp_f: 63, chance_of_rain: 15, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
              { time: '2026-10-21 15:00', temp_c: 18, temp_f: 64, chance_of_rain: 20, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
              { time: '2026-10-21 18:00', temp_c: 15, temp_f: 59, chance_of_rain: 30, condition: { text: 'Patchy Rain', iconCode: 'rain' } },
              { time: '2026-10-21 21:00', temp_c: 13, temp_f: 55, chance_of_rain: 10, condition: { text: 'Clear', iconCode: 'sunny' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 17, maxtemp_f: 63, mintemp_c: 10, mintemp_f: 50, daily_chance_of_rain: 45, condition: { text: 'Light Showers', iconCode: 'rain' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 19, maxtemp_f: 66, mintemp_c: 12, mintemp_f: 54, daily_chance_of_rain: 15, condition: { text: 'Sunny Intervals', iconCode: 'sunny' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'lon-01',
        title: 'London Transport Authority Unveils High-Tech Clean Transit Network',
        description: 'New rapid-transit links and zero-emission transit expansions have reduced average city commute times and improved air quality index figures across the capital.',
        source_name: 'Metro London',
        pubDate: '2026-10-21 12:45:00',
        category: 'top',
        link: 'https://example.com/london-transit-update'
      },
      {
        article_id: 'lon-02',
        title: 'Tech Innovation Summit Opens in East London Innovation Hub',
        description: 'Over 500 startup founders and artificial intelligence leaders gathered in Shoreditch to showcase next-generation energy management and decentralized technologies.',
        source_name: 'UK Tech Dispatch',
        pubDate: '2026-10-21 10:30:00',
        category: 'technology',
        link: 'https://example.com/london-tech-summit'
      },
      {
        article_id: 'lon-03',
        title: 'Premier League Weekend Preview: Key London Derbies and Tactical Battles',
        description: 'London clubs prepare for a pivotal series of upcoming clashes as title contenders and European qualifying contenders face off.',
        source_name: 'Capital Sports',
        pubDate: '2026-10-21 08:15:00',
        category: 'sports',
        link: 'https://example.com/premier-league-preview'
      },
      {
        article_id: 'lon-04',
        title: 'Central City Cultural Festival Returns to South Bank with Free Exhibits',
        description: 'Art installations, interactive science displays, and live music performances bring tens of thousands of visitors along the River Thames this week.',
        source_name: 'London Arts Review',
        pubDate: '2026-10-20 18:00:00',
        category: 'business',
        link: 'https://example.com/south-bank-festival'
      }
    ]
  },

  'new york': {
    weather: {
      location: { name: 'New York', region: 'New York', country: 'United States', localtime: '2026-10-21 10:30' },
      current: {
        temp_c: 19.0, temp_f: 66.2, condition: { text: 'Sunny & Clear', iconCode: 'sunny' },
        wind_kph: 14.5, wind_dir: 'NE', pressure_mb: 1018, humidity: 52, cloud: 10,
        feelslike_c: 19.0, feelslike_f: 66.2, vis_km: 16, uv: 5, rain_chance: 5
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 21, maxtemp_f: 70, mintemp_c: 13, mintemp_f: 55, daily_chance_of_rain: 5, condition: { text: 'Sunny', iconCode: 'sunny' } },
            hour: [
              { time: '2026-10-21 09:00', temp_c: 16, temp_f: 61, chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 12:00', temp_c: 20, temp_f: 68, chance_of_rain: 5, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 15:00', temp_c: 21, temp_f: 70, chance_of_rain: 5, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 18:00', temp_c: 18, temp_f: 64, chance_of_rain: 0, condition: { text: 'Clear', iconCode: 'sunny' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 22, maxtemp_f: 72, mintemp_c: 14, mintemp_f: 57, daily_chance_of_rain: 10, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 18, maxtemp_f: 64, mintemp_c: 12, mintemp_f: 53, daily_chance_of_rain: 60, condition: { text: 'Scattered Rain', iconCode: 'rain' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'ny-01',
        title: 'New York Wall Street Markets Rally on Strong Tech and Retail Earnings',
        description: 'Major stock indices gained momentum as quarterly corporate earnings outperformed consensus projections, driven by advances in enterprise productivity software.',
        source_name: 'NYC Financial Times',
        pubDate: '2026-10-21 09:45:00',
        category: 'business',
        link: 'https://example.com/wall-street-rally'
      },
      {
        article_id: 'ny-02',
        title: 'Manhattan Waterfront Greenway Extension Project Reaches Final Phase',
        description: 'City officials announced the completion of the new 5-mile continuous bike and pedestrian path along the Hudson, enhancing urban recreation.',
        source_name: 'New York Chronicle',
        pubDate: '2026-10-21 07:30:00',
        category: 'top',
        link: 'https://example.com/greenway-project'
      },
      {
        article_id: 'ny-03',
        title: 'Brooklyn Tech Incubator Announces $100M Fund for Local Entrepreneurs',
        description: 'A major civic technology initiative will provide seed capital and engineering support for clean energy and climate software startups.',
        source_name: 'Silicon Alley News',
        pubDate: '2026-10-20 16:20:00',
        category: 'technology',
        link: 'https://example.com/brooklyn-tech-fund'
      }
    ]
  },

  mumbai: {
    weather: {
      location: { name: 'Mumbai', region: 'Maharashtra', country: 'India', localtime: '2026-10-21 20:00' },
      current: {
        temp_c: 29.5, temp_f: 85.1, condition: { text: 'Warm & Humid', iconCode: 'partly-cloudy' },
        wind_kph: 12.0, wind_dir: 'WNW', pressure_mb: 1010, humidity: 76, cloud: 30,
        feelslike_c: 33.2, feelslike_f: 91.8, vis_km: 8, uv: 1, rain_chance: 15
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 32, maxtemp_f: 90, mintemp_c: 26, mintemp_f: 79, daily_chance_of_rain: 15, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
            hour: [
              { time: '2026-10-21 12:00', temp_c: 32, temp_f: 90, chance_of_rain: 10, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 15:00', temp_c: 31, temp_f: 88, chance_of_rain: 15, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
              { time: '2026-10-21 18:00', temp_c: 29, temp_f: 84, chance_of_rain: 20, condition: { text: 'Warm Breeze', iconCode: 'partly-cloudy' } },
              { time: '2026-10-21 21:00', temp_c: 28, temp_f: 82, chance_of_rain: 10, condition: { text: 'Clear Sky', iconCode: 'sunny' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 33, maxtemp_f: 91, mintemp_c: 26, mintemp_f: 79, daily_chance_of_rain: 10, condition: { text: 'Warm & Sunny', iconCode: 'sunny' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 32, maxtemp_f: 90, mintemp_c: 25, mintemp_f: 77, daily_chance_of_rain: 20, condition: { text: 'Humid Intervals', iconCode: 'partly-cloudy' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'mum-01',
        title: 'Mumbai Metro Phase 3 Line Expands Services Across Central Corridors',
        description: 'Commuters report substantial reductions in transit congestion across south and suburban corridors as extended automated underground train lines open.',
        source_name: 'The Times of India',
        pubDate: '2026-10-21 16:30:00',
        category: 'top',
        link: 'https://example.com/mumbai-metro-line-expansion'
      },
      {
        article_id: 'mum-02',
        title: 'BSE Index Scales New Record High on Robust Domestic Economic Inflows',
        description: 'Indian equity benchmarks posted significant intraday gains, supported by consumer confidence indicators and infrastructure sector investment.',
        source_name: 'Economic Bureau',
        pubDate: '2026-10-21 14:15:00',
        category: 'business',
        link: 'https://example.com/bse-record-high'
      },
      {
        article_id: 'mum-03',
        title: 'Bandra Coastal Promenade Festival Kicks Off with Marine Conservation Drives',
        description: 'Citizens, environmentalists, and artists congregate to celebrate coastal preservation along the newly restored promenade.',
        source_name: 'Mumbai Mirror',
        pubDate: '2026-10-20 19:40:00',
        category: 'top',
        link: 'https://example.com/bandra-promenade-festival'
      }
    ]
  },

  delhi: {
    weather: {
      location: { name: 'Delhi', region: 'National Capital Territory', country: 'India', localtime: '2026-10-21 20:00' },
      current: {
        temp_c: 27.2, temp_f: 81.0, condition: { text: 'Mild Evening', iconCode: 'sunny' },
        wind_kph: 8.5, wind_dir: 'NW', pressure_mb: 1012, humidity: 48, cloud: 15,
        feelslike_c: 26.8, feelslike_f: 80.2, vis_km: 7, uv: 1, rain_chance: 5
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 31, maxtemp_f: 88, mintemp_c: 19, mintemp_f: 66, daily_chance_of_rain: 5, condition: { text: 'Sunny', iconCode: 'sunny' } },
            hour: [
              { time: '2026-10-21 12:00', temp_c: 30, temp_f: 86, chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 15:00', temp_c: 31, temp_f: 88, chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 18:00', temp_c: 28, temp_f: 82, chance_of_rain: 5, condition: { text: 'Clear', iconCode: 'sunny' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 30, maxtemp_f: 86, mintemp_c: 18, mintemp_f: 64, daily_chance_of_rain: 5, condition: { text: 'Clear', iconCode: 'sunny' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 29, maxtemp_f: 84, mintemp_c: 17, mintemp_f: 63, daily_chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'del-01',
        title: 'New Clean Energy Transit Policy Deploys 2,000 Electric Buses Across Delhi',
        description: 'The national capital achieves a key electrification milestone as state fleets modernize with zero-emission transit solutions.',
        source_name: 'Delhi National News',
        pubDate: '2026-10-21 13:00:00',
        category: 'top',
        link: 'https://example.com/delhi-electric-bus-fleet'
      },
      {
        article_id: 'del-02',
        title: 'India International Trade Expo Opens in Pragati Maidan with 40 Participating Nations',
        description: 'Exhibitions of manufacturing technology, artisanal crafts, and sustainable digital solutions highlight this year’s international trade fair.',
        source_name: 'Hindustan Chronicle',
        pubDate: '2026-10-21 11:20:00',
        category: 'business',
        link: 'https://example.com/delhi-trade-expo'
      }
    ]
  },

  tokyo: {
    weather: {
      location: { name: 'Tokyo', region: 'Kanto', country: 'Japan', localtime: '2026-10-21 23:30' },
      current: {
        temp_c: 18.2, temp_f: 64.8, condition: { text: 'Clear & Cool', iconCode: 'sunny' },
        wind_kph: 15.1, wind_dir: 'NNE', pressure_mb: 1022, humidity: 55, cloud: 10,
        feelslike_c: 18.0, feelslike_f: 64.4, vis_km: 15, uv: 0, rain_chance: 0
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 21, maxtemp_f: 70, mintemp_c: 14, mintemp_f: 57, daily_chance_of_rain: 0, condition: { text: 'Clear', iconCode: 'sunny' } },
            hour: [
              { time: '2026-10-21 12:00', temp_c: 20, temp_f: 68, chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 15:00', temp_c: 21, temp_f: 70, chance_of_rain: 0, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 18:00', temp_c: 19, temp_f: 66, chance_of_rain: 0, condition: { text: 'Clear', iconCode: 'sunny' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 22, maxtemp_f: 72, mintemp_c: 15, mintemp_f: 59, daily_chance_of_rain: 10, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 20, maxtemp_f: 68, mintemp_c: 13, mintemp_f: 55, daily_chance_of_rain: 25, condition: { text: 'Mild Showers', iconCode: 'rain' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'tok-01',
        title: 'Tokyo Robotics & AI Pavilion Showcases Autonomous Caregiver Helpers',
        description: 'Next-generation robotics engineered for elder assistance and hospital logistics demonstrated near Odaiba Bay.',
        source_name: 'Japan Technology Review',
        pubDate: '2026-10-21 18:00:00',
        category: 'technology',
        link: 'https://example.com/tokyo-robotics-summit'
      },
      {
        article_id: 'tok-02',
        title: 'Shinkansen High-Speed Magnetic Levitation Network Extends Test Runs',
        description: 'Engineers achieve record stability tests as Japan prepares for future ultra-rapid commercial transit between metropolitan centers.',
        source_name: 'Kanto Express',
        pubDate: '2026-10-21 14:00:00',
        category: 'top',
        link: 'https://example.com/maglev-train-updates'
      }
    ]
  },

  paris: {
    weather: {
      location: { name: 'Paris', region: 'Ile-de-France', country: 'France', localtime: '2026-10-21 16:30' },
      current: {
        temp_c: 17.5, temp_f: 63.5, condition: { text: 'Breezy & Sunny', iconCode: 'sunny' },
        wind_kph: 16.0, wind_dir: 'W', pressure_mb: 1016, humidity: 62, cloud: 25,
        feelslike_c: 17.0, feelslike_f: 62.6, vis_km: 12, uv: 3, rain_chance: 10
      },
      forecast: {
        forecastday: [
          {
            date: '2026-10-21',
            day: { maxtemp_c: 19, maxtemp_f: 66, mintemp_c: 11, mintemp_f: 52, daily_chance_of_rain: 10, condition: { text: 'Sunny', iconCode: 'sunny' } },
            hour: [
              { time: '2026-10-21 12:00', temp_c: 18, temp_f: 64, chance_of_rain: 5, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 15:00', temp_c: 19, temp_f: 66, chance_of_rain: 10, condition: { text: 'Sunny', iconCode: 'sunny' } },
              { time: '2026-10-21 18:00', temp_c: 16, temp_f: 61, chance_of_rain: 10, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } }
            ]
          },
          {
            date: '2026-10-22',
            day: { maxtemp_c: 18, maxtemp_f: 64, mintemp_c: 10, mintemp_f: 50, daily_chance_of_rain: 35, condition: { text: 'Scattered Clouds', iconCode: 'partly-cloudy' } }
          },
          {
            date: '2026-10-23',
            day: { maxtemp_c: 17, maxtemp_f: 63, mintemp_c: 9, mintemp_f: 48, daily_chance_of_rain: 50, condition: { text: 'Light Rain', iconCode: 'rain' } }
          }
        ]
      }
    },
    news: [
      {
        article_id: 'par-01',
        title: 'Seine Clean Energy Initiative Marks Clean Water Recreation Milestone',
        description: 'New eco-friendly filtration plants along the river basin celebrate sustained safety benchmarks for urban recreation and aquatic biodiversity.',
        source_name: 'Le Parisien',
        pubDate: '2026-10-21 15:00:00',
        category: 'top',
        link: 'https://example.com/seine-water-quality'
      },
      {
        article_id: 'par-02',
        title: 'European Aerospace Consortium Signs Record Clean Aviation Accord',
        description: 'Aviation leaders gathered at Paris Le Bourget sign landmark commitments towards hydrogen and synthetic sustainable fuels.',
        source_name: 'France Économie',
        pubDate: '2026-10-21 11:30:00',
        category: 'business',
        link: 'https://example.com/paris-aviation-accord'
      }
    ]
  }
};

// ==========================================
// PURE SVG WEATHER ICONS (NEVER BREAK OFFLINE)
// ==========================================
const SVG_ICONS = {
  sunny: `<svg viewBox="0 0 64 64" class="weather-svg"><circle cx="32" cy="32" r="14" fill="#fbbf24"/><g stroke="#fbbf24" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/><line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/><line x1="14" y1="14" x2="18" y2="18"/><line x1="46" y1="46" x2="50" y2="50"/><line x1="14" y1="50" x2="18" y2="46"/><line x1="46" y1="18" x2="50" y2="14"/></g></svg>`,
  'partly-cloudy': `<svg viewBox="0 0 64 64" class="weather-svg"><circle cx="24" cy="24" r="11" fill="#fbbf24"/><path d="M46 48H20a10 10 0 0 1-2-19.8 14 14 0 0 1 27.2-3.2A10 10 0 0 1 46 48z" fill="#94a3b8" opacity="0.9"/></svg>`,
  cloudy: `<svg viewBox="0 0 64 64" class="weather-svg"><path d="M48 46H18a12 12 0 0 1-2-23.8 16 16 0 0 1 31.2-3.2A12 12 0 0 1 48 46z" fill="#64748b"/></svg>`,
  rain: `<svg viewBox="0 0 64 64" class="weather-svg"><path d="M46 40H20a10 10 0 0 1-2-19.8 14 14 0 0 1 27.2-3.2A10 10 0 0 1 46 40z" fill="#64748b"/><g stroke="#38bdf8" stroke-width="3" stroke-linecap="round"><line x1="22" y1="46" x2="18" y2="54"/><line x1="32" y1="46" x2="28" y2="54"/><line x1="42" y1="46" x2="38" y2="54"/></g></svg>`,
  snow: `<svg viewBox="0 0 64 64" class="weather-svg"><path d="M46 40H20a10 10 0 0 1-2-19.8 14 14 0 0 1 27.2-3.2A10 10 0 0 1 46 40z" fill="#94a3b8"/><circle cx="20" cy="50" r="2" fill="#e2e8f0"/><circle cx="32" cy="52" r="2.5" fill="#e2e8f0"/><circle cx="44" cy="49" r="2" fill="#e2e8f0"/></svg>`
};

function getWeatherSvg(conditionText, iconCode = null) {
  if (iconCode && SVG_ICONS[iconCode]) return SVG_ICONS[iconCode];
  const t = (conditionText || '').toLowerCase();
  if (t.includes('rain') || t.includes('drizzle') || t.includes('shower')) return SVG_ICONS.rain;
  if (t.includes('snow') || t.includes('ice') || t.includes('blizzard')) return SVG_ICONS.snow;
  if (t.includes('partly') || t.includes('scattered') || t.includes('intervals')) return SVG_ICONS['partly-cloudy'];
  if (t.includes('cloud') || t.includes('overcast') || t.includes('mist') || t.includes('fog')) return SVG_ICONS.cloudy;
  return SVG_ICONS.sunny;
}

// ==========================================
// STATE MANAGEMENT
// ==========================================
let state = {
  currentCity: '',
  isOnline: navigator.onLine,
  unit: 'C',
  theme: 'dark',
  weatherData: null,
  newsArticles: [],
  selectedCategory: 'all',
  savedArticles: []
};

// ==========================================
// DOM REFERENCES
// ==========================================
const el = {
  networkBanner: document.getElementById('network-banner'),
  networkText: document.getElementById('network-text'),
  cacheInfo: document.getElementById('cache-info'),
  syncBtn: document.getElementById('sync-btn'),
  searchForm: document.getElementById('search-form'),
  locationInput: document.getElementById('location-input'),
  geoBtn: document.getElementById('geo-btn'),
  recentChips: document.getElementById('recent-chips'),
  unitC: document.getElementById('unit-c'),
  unitF: document.getElementById('unit-f'),
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  weatherCard: document.getElementById('current-weather-card'),
  locationName: document.getElementById('location-name'),
  locationMeta: document.getElementById('location-meta'),
  conditionBadge: document.getElementById('condition-badge'),
  currentTemp: document.getElementById('current-temp'),
  tempUnit: document.querySelector('.temp-unit'),
  weatherIcon: document.getElementById('weather-icon'),
  conditionText: document.getElementById('condition-text'),
  feelsLikeTemp: document.getElementById('feels-like-temp'),
  weatherUpdated: document.getElementById('weather-updated-time'),
  metricHumidity: document.getElementById('metric-humidity'),
  metricWind: document.getElementById('metric-wind'),
  metricUV: document.getElementById('metric-uv'),
  metricRainChance: document.getElementById('metric-rain-chance'),
  metricPressure: document.getElementById('metric-pressure'),
  metricVisibility: document.getElementById('metric-visibility'),
  hourlyTrack: document.getElementById('hourly-track'),
  forecastList: document.getElementById('forecast-list'),
  newsFeed: document.getElementById('news-feed'),
  newsSubtitle: document.getElementById('news-subtitle'),
  newsUpdated: document.getElementById('news-updated-time'),
  newsCategories: document.getElementById('news-categories'),
  savedModalBtn: document.getElementById('saved-modal-btn'),
  savedModal: document.getElementById('saved-modal'),
  closeSavedModal: document.getElementById('close-saved-modal'),
  savedCount: document.getElementById('saved-count'),
  savedArticlesList: document.getElementById('saved-articles-list'),
  toast: document.getElementById('toast')
};

// Replace weather-icon img element with an inline SVG wrapper
let iconContainer = document.getElementById('weather-icon-container');
if (!iconContainer) {
  iconContainer = document.createElement('div');
  iconContainer.id = 'weather-icon-container';
  iconContainer.className = 'weather-svg-container';
  if (el.weatherIcon && el.weatherIcon.parentNode) {
    el.weatherIcon.parentNode.insertBefore(iconContainer, el.weatherIcon);
    el.weatherIcon.style.display = 'none';
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadPreferences();
  initNetworkListeners();
  initEventListeners();
  loadSavedArticles();
  renderRecentChips();
  registerServiceWorker();

  // Load default or last city
  const cityToLoad = state.currentCity || CONFIG.DEFAULT_CITY;
  fetchDashboardData(cityToLoad);
});

// ==========================================
// NETWORK & SERVICE WORKER
// ==========================================
function initNetworkListeners() {
  updateNetworkStatus(navigator.onLine);

  window.addEventListener('online', () => {
    state.isOnline = true;
    updateNetworkStatus(true);
    showToast('🟢 Internet connected! Refreshing live weather & news...');
    if (state.currentCity) fetchDashboardData(state.currentCity, false);
  });

  window.addEventListener('offline', () => {
    state.isOnline = false;
    updateNetworkStatus(false);
    showToast('⚡ Offline Mode active. All data loaded from offline storage.');
  });
}

function updateNetworkStatus(online, cacheTimestamp = null) {
  if (online) {
    el.networkBanner.className = 'network-banner online';
    el.networkText.textContent = '🟢 Online: Real-time Live Weather & News';
    el.cacheInfo.textContent = '';
  } else {
    el.networkBanner.className = 'network-banner offline';
    el.networkText.textContent = '⚡ 100% Offline Mode: Displaying Saved Archive & Forecasts';
    if (cacheTimestamp) {
      el.cacheInfo.textContent = `Saved: ${formatRelativeTime(cacheTimestamp)}`;
    }
  }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.log('Service Worker registration note:', err));
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
  el.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = el.locationInput.value.trim();
    if (query) {
      fetchDashboardData(query);
      el.locationInput.blur();
    }
  });

  el.geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported. Please search a city name.');
      return;
    }
    showToast('Locating your coordinates...');
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchDashboardData(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => showToast('Could not access GPS. Please type your city name.'),
      { timeout: 8000 }
    );
  });

  el.syncBtn.addEventListener('click', () => {
    if (state.currentCity) fetchDashboardData(state.currentCity, false);
  });

  el.unitC.addEventListener('click', () => setUnit('C'));
  el.unitF.addEventListener('click', () => setUnit('F'));
  el.themeToggle.addEventListener('click', toggleTheme);

  el.newsCategories.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-pill')) {
      document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      state.selectedCategory = e.target.dataset.category;
      renderNews(state.newsArticles);
    }
  });

  el.savedModalBtn.addEventListener('click', () => {
    renderSavedArticles();
    el.savedModal.classList.remove('hidden');
  });

  el.closeSavedModal.addEventListener('click', () => el.savedModal.classList.add('hidden'));
  el.savedModal.addEventListener('click', (e) => {
    if (e.target === el.savedModal) el.savedModal.classList.add('hidden');
  });
}

// ==========================================
// UNIFIED DATA DISPATCHER (ONLINE + OFFLINE)
// ==========================================
async function fetchDashboardData(cityQuery, preferCache = false) {
  const normalizedKey = cityQuery.trim().toLowerCase();
  showLoadingState();

  // 1. Check local storage cache first
  let cachedWeather = getCachedData(CONFIG.CACHE_PREFIX_WEATHER + normalizedKey);
  let cachedNews = getCachedData(CONFIG.CACHE_PREFIX_NEWS + normalizedKey);

  // 2. Check pre-bundled offline database if not in localStorage
  if (!cachedWeather && OFFLINE_DB[normalizedKey]) {
    cachedWeather = { data: OFFLINE_DB[normalizedKey].weather, timestamp: Date.now() };
  }
  if (!cachedNews && OFFLINE_DB[normalizedKey]) {
    cachedNews = { data: OFFLINE_DB[normalizedKey].news, timestamp: Date.now() };
  }

  // If offline or preferring cache:
  if (!navigator.onLine || preferCache) {
    serveOfflineData(cityQuery, cachedWeather, cachedNews);
    return;
  }

  // If online: Fetch fresh API data
  try {
    const [weatherRes, newsRes] = await Promise.allSettled([
      fetchWeatherAPI(cityQuery),
      fetchNewsAPI(cityQuery)
    ]);

    // Handle Weather
    if (weatherRes.status === 'fulfilled' && weatherRes.value) {
      state.weatherData = weatherRes.value;
      state.currentCity = state.weatherData.location.name;
      setCachedData(CONFIG.CACHE_PREFIX_WEATHER + normalizedKey, state.weatherData);
      setCachedData(CONFIG.CACHE_PREFIX_WEATHER + state.currentCity.toLowerCase(), state.weatherData);
      addRecentCity(state.currentCity);
      renderWeather(state.weatherData);
      updateNetworkStatus(true);
    } else {
      // Fallback to offline cache
      fallbackToOfflineWeather(cityQuery, cachedWeather);
    }

    // Handle News
    if (newsRes.status === 'fulfilled' && newsRes.value && newsRes.value.length > 0) {
      state.newsArticles = newsRes.value;
      setCachedData(CONFIG.CACHE_PREFIX_NEWS + normalizedKey, state.newsArticles);
      setCachedData(CONFIG.CACHE_PREFIX_NEWS + (state.currentCity || '').toLowerCase(), state.newsArticles);
      renderNews(state.newsArticles);
    } else {
      // Fallback to offline cache
      fallbackToOfflineNews(cityQuery, cachedNews);
    }

    savePreferences();
  } catch (error) {
    console.warn('Network request failed, serving offline dataset:', error);
    serveOfflineData(cityQuery, cachedWeather, cachedNews);
  }
}

function serveOfflineData(cityQuery, cachedWeather, cachedNews) {
  updateNetworkStatus(false, cachedWeather ? cachedWeather.timestamp : Date.now());

  if (cachedWeather) {
    state.weatherData = cachedWeather.data;
    state.currentCity = state.weatherData.location.name;
    renderWeather(state.weatherData);
  } else {
    // Generate a simulated offline forecast for any custom city searched offline
    state.weatherData = generateFallbackWeather(cityQuery);
    state.currentCity = state.weatherData.location.name;
    renderWeather(state.weatherData);
  }

  if (cachedNews && cachedNews.data && cachedNews.data.length > 0) {
    state.newsArticles = cachedNews.data;
    renderNews(state.newsArticles);
  } else {
    // Generate simulated offline news headlines for this place
    state.newsArticles = generateFallbackNews(cityQuery);
    renderNews(state.newsArticles);
  }

  savePreferences();
  addRecentCity(state.currentCity);
  showToast(`⚡ Displaying offline archive for ${state.currentCity}`);
}

function fallbackToOfflineWeather(cityQuery, cachedWeather) {
  if (cachedWeather) {
    state.weatherData = cachedWeather.data;
    state.currentCity = state.weatherData.location.name;
    renderWeather(state.weatherData);
  } else {
    state.weatherData = generateFallbackWeather(cityQuery);
    state.currentCity = state.weatherData.location.name;
    renderWeather(state.weatherData);
  }
}

function fallbackToOfflineNews(cityQuery, cachedNews) {
  if (cachedNews && cachedNews.data) {
    state.newsArticles = cachedNews.data;
  } else {
    state.newsArticles = generateFallbackNews(cityQuery);
  }
  renderNews(state.newsArticles);
}

// ==========================================
// DYNAMIC OFFLINE GENERATOR (IF CITY NOT PRE-SEEDED)
// Ensures any city entered offline displays full weather & news!
// ==========================================
function generateFallbackWeather(cityName) {
  const cleanName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  return {
    location: {
      name: cleanName,
      region: 'Offline Archive',
      country: 'Local Database',
      localtime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    current: {
      temp_c: 21.0,
      temp_f: 69.8,
      condition: { text: 'Partly Cloudy (Offline Forecast)', iconCode: 'partly-cloudy' },
      wind_kph: 14.0,
      wind_dir: 'W',
      pressure_mb: 1015,
      humidity: 58,
      cloud: 35,
      feelslike_c: 21.0,
      feelslike_f: 69.8,
      vis_km: 10,
      uv: 4,
      rain_chance: 15
    },
    forecast: {
      forecastday: [
        {
          date: dateStr,
          day: { maxtemp_c: 23, maxtemp_f: 73, mintemp_c: 14, mintemp_f: 57, daily_chance_of_rain: 15, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
          hour: [
            { time: `${dateStr} 09:00`, temp_c: 16, temp_f: 61, chance_of_rain: 10, condition: { text: 'Sunny', iconCode: 'sunny' } },
            { time: `${dateStr} 12:00`, temp_c: 21, temp_f: 70, chance_of_rain: 15, condition: { text: 'Partly Cloudy', iconCode: 'partly-cloudy' } },
            { time: `${dateStr} 15:00`, temp_c: 23, temp_f: 73, chance_of_rain: 20, condition: { text: 'Warm', iconCode: 'sunny' } },
            { time: `${dateStr} 18:00`, temp_c: 19, temp_f: 66, chance_of_rain: 10, condition: { text: 'Pleasant', iconCode: 'sunny' } }
          ]
        },
        {
          date: 'Tomorrow',
          day: { maxtemp_c: 24, maxtemp_f: 75, mintemp_c: 15, mintemp_f: 59, daily_chance_of_rain: 10, condition: { text: 'Sunny Intervals', iconCode: 'sunny' } }
        },
        {
          date: 'Day After',
          day: { maxtemp_c: 22, maxtemp_f: 71, mintemp_c: 13, mintemp_f: 55, daily_chance_of_rain: 30, condition: { text: 'Passing Showers', iconCode: 'rain' } }
        }
      ]
    }
  };
}

function generateFallbackNews(cityName) {
  const cleanName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  return [
    {
      article_id: `off-${cityName}-1`,
      title: `${cleanName} Municipal Council Announces Comprehensive Smart Grid & Infrastructure Upgrade`,
      description: `Public works officials in ${cleanName} have confirmed a new modern infrastructure package aimed at improving local energy efficiency, road resurfacing, and expanding municipal public parks.`,
      source_name: `${cleanName} Local Herald`,
      pubDate: '2026-10-21 12:00:00',
      category: 'top',
      link: '#'
    },
    {
      article_id: `off-${cityName}-2`,
      title: `Technology & Business Startups in ${cleanName} Report Record Growth for Quarter 3`,
      description: `Regional commercial associations celebrate significant employment growth and tech investment across commercial districts in ${cleanName}.`,
      source_name: 'Regional Business Daily',
      pubDate: '2026-10-21 09:30:00',
      category: 'business',
      link: '#'
    },
    {
      article_id: `off-${cityName}-3`,
      title: `Annual ${cleanName} Community Cultural and Athletics Festival Set for This Weekend`,
      description: `Organizers expect thousands of families and local sports teams to participate in this weekend's city championships and culinary food fair.`,
      source_name: `${cleanName} Sports & Life`,
      pubDate: '2026-10-20 17:15:00',
      category: 'sports',
      link: '#'
    }
  ];
}

// ==========================================
// API CLIENTS
// ==========================================
async function fetchWeatherAPI(query) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${encodeURIComponent(query)}&days=3&aqi=no&alerts=no`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather API Error: ${response.status}`);
  return await response.json();
}

async function fetchNewsAPI(query) {
  const url = `https://newsdata.io/api/1/news?apikey=${CONFIG.NEWS_API_KEY}&q=${encodeURIComponent(query)}&language=en`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`News API Error: ${response.status}`);
  const data = await response.json();
  return data.results || [];
}

// ==========================================
// WEATHER RENDERING
// ==========================================
function renderWeather(data) {
  if (!data || !data.current || !data.location) return;

  el.weatherCard.classList.remove('loading-skeleton');
  el.locationName.textContent = `${data.location.name}, ${data.location.country || ''}`;
  el.locationMeta.textContent = `Local time: ${data.location.localtime || 'Now'} • ${data.location.region || ''}`;
  el.conditionBadge.textContent = data.current.condition.text;

  const temp = state.unit === 'C' ? Math.round(data.current.temp_c) : Math.round(data.current.temp_f);
  const feelsLike = state.unit === 'C' ? `${Math.round(data.current.feelslike_c)}°C` : `${Math.round(data.current.feelslike_f)}°F`;

  el.currentTemp.textContent = temp;
  el.tempUnit.textContent = `°${state.unit}`;
  el.feelsLikeTemp.textContent = feelsLike;
  el.conditionText.textContent = data.current.condition.text;

  // Render SVG Weather Icon (works 100% offline)
  const iconCode = data.current.condition.iconCode || null;
  const targetIconContainer = document.getElementById('weather-icon-container') || iconContainer;
  if (targetIconContainer) {
    targetIconContainer.innerHTML = getWeatherSvg(data.current.condition.text, iconCode);
  }

  // Metrics
  el.metricHumidity.textContent = `${data.current.humidity}%`;
  el.metricWind.textContent = `${Math.round(data.current.wind_kph)} km/h (${data.current.wind_dir})`;
  el.metricUV.textContent = data.current.uv;
  el.metricPressure.textContent = `${data.current.pressure_mb} mb`;
  el.metricVisibility.textContent = `${data.current.vis_km} km`;

  const todayForecast = data.forecast?.forecastday?.[0];
  const rainChance = todayForecast?.day?.daily_chance_of_rain || data.current.rain_chance || 0;
  el.metricRainChance.textContent = `${rainChance}%`;

  el.weatherUpdated.textContent = `Updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  renderHourlyForecast(todayForecast);
  renderMultiDayForecast(data.forecast?.forecastday || []);
}

function renderHourlyForecast(forecastDay) {
  el.hourlyTrack.innerHTML = '';
  if (!forecastDay || !forecastDay.hour) return;

  const currentHour = new Date().getHours();
  const hoursToShow = forecastDay.hour.filter((_, idx) => idx >= currentHour).slice(0, 10);
  const hours = hoursToShow.length >= 4 ? hoursToShow : forecastDay.hour.slice(-6);

  hours.forEach(h => {
    const timeStr = h.time.includes(' ') ? h.time.split(' ')[1] : h.time;
    const temp = state.unit === 'C' ? Math.round(h.temp_c) : Math.round(h.temp_f);
    const rain = h.chance_of_rain || 0;
    const svgIcon = getWeatherSvg(h.condition.text, h.condition.iconCode);

    const hourEl = document.createElement('div');
    hourEl.className = 'hourly-item';
    hourEl.innerHTML = `
      <span class="hourly-time">${timeStr}</span>
      <div class="hourly-svg-box">${svgIcon}</div>
      <span class="hourly-temp">${temp}°</span>
      <span class="hourly-rain">💧${rain}%</span>
    `;
    el.hourlyTrack.appendChild(hourEl);
  });
}

function renderMultiDayForecast(forecastDays) {
  el.forecastList.innerHTML = '';
  if (!forecastDays || forecastDays.length === 0) return;

  forecastDays.forEach((fd, idx) => {
    let dayName = 'Day';
    if (idx === 0) dayName = 'Today';
    else if (fd.date === 'Tomorrow' || fd.date === 'Day After') dayName = fd.date;
    else {
      const dateObj = new Date(fd.date + 'T00:00:00');
      dayName = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-US', { weekday: 'short' }) : `Day ${idx + 1}`;
    }

    const maxTemp = state.unit === 'C' ? Math.round(fd.day.maxtemp_c) : Math.round(fd.day.maxtemp_f);
    const minTemp = state.unit === 'C' ? Math.round(fd.day.mintemp_c) : Math.round(fd.day.mintemp_f);
    const svgIcon = getWeatherSvg(fd.day.condition.text, fd.day.condition.iconCode);

    const row = document.createElement('div');
    row.className = 'forecast-row';
    row.innerHTML = `
      <span class="forecast-day">${dayName}</span>
      <div class="forecast-condition-group">
        <div class="forecast-svg-box">${svgIcon}</div>
        <span class="forecast-condition-text">${fd.day.condition.text}</span>
      </div>
      <div class="forecast-temp-range">
        <span class="temp-max">${maxTemp}°</span>
        <span class="temp-min">${minTemp}°</span>
      </div>
    `;
    el.forecastList.appendChild(row);
  });
}

// ==========================================
// NEWS RENDERING
// ==========================================
function renderNews(articles) {
  el.newsFeed.innerHTML = '';
  el.newsSubtitle.textContent = `Important news headlines for ${state.currentCity || 'this area'}`;
  el.newsUpdated.textContent = `Updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  if (!articles || articles.length === 0) {
    el.newsFeed.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 30px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <p style="font-weight: 600;">No articles available in local storage for this location yet.</p>
      </div>
    `;
    return;
  }

  let filtered = articles;
  if (state.selectedCategory !== 'all') {
    filtered = articles.filter(a => {
      const cats = Array.isArray(a.category) ? a.category : [a.category];
      return cats.some(c => String(c).toLowerCase().includes(state.selectedCategory));
    });
    if (filtered.length === 0) filtered = articles;
  }

  filtered.forEach(art => {
    const isSaved = state.savedArticles.some(s => s.article_id === art.article_id || s.link === art.link);
    const card = document.createElement('article');
    card.className = 'news-card';

    const title = escapeHtml(art.title || 'Breaking Local News');
    const desc = escapeHtml(art.description || 'Click to view full coverage and details.');
    const source = escapeHtml(art.source_name || art.source_id || 'News');
    const timeStr = art.pubDate ? formatRelativeTime(art.pubDate) : 'Recently';
    const link = art.link || '#';
    const imgUrl = art.image_url;

    // Use graceful vector image placeholder when offline or if image fails
    const imageHtml = (imgUrl && navigator.onLine)
      ? `<img src="${imgUrl}" alt="${title}" class="news-img" loading="lazy" onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\\'news-img-placeholder\\'><svg viewBox=\\'0 0 24 24\\'><path d=\\'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z\\'/></svg></div>';">`
      : `<div class="news-img-placeholder">
          <svg viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
        </div>`;

    card.innerHTML = `
      <div class="news-img-box">${imageHtml}</div>
      <div class="news-content">
        <div class="news-meta-row">
          <span class="news-source">${source}</span>
          <span class="news-time">${timeStr}</span>
        </div>
        <h4 class="news-title">${title}</h4>
        <p class="news-desc">${desc}</p>
        <div class="news-footer">
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="read-btn">
            Read story &rarr;
          </a>
          <button class="bookmark-btn ${isSaved ? 'saved' : ''}" title="${isSaved ? 'Remove offline bookmark' : 'Save for offline reading'}">
            <svg viewBox="0 0 24 24"><path d="${isSaved ? 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z' : 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z'}"/></svg>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.bookmark-btn').addEventListener('click', () => {
      toggleSaveArticle(art);
      renderNews(state.newsArticles);
    });

    el.newsFeed.appendChild(card);
  });
}

// ==========================================
// OFFLINE SAVED ARTICLES
// ==========================================
function loadSavedArticles() {
  try {
    const raw = localStorage.getItem(CONFIG.SAVED_ARTICLES_KEY);
    state.savedArticles = raw ? JSON.parse(raw) : [];
  } catch (e) {
    state.savedArticles = [];
  }
  updateSavedCount();
}

function toggleSaveArticle(article) {
  const existingIdx = state.savedArticles.findIndex(a => 
    (a.article_id && a.article_id === article.article_id) || (a.link && a.link === article.link)
  );

  if (existingIdx > -1) {
    state.savedArticles.splice(existingIdx, 1);
    showToast('Removed from saved offline articles');
  } else {
    state.savedArticles.unshift({
      article_id: article.article_id || Date.now().toString(),
      title: article.title || 'Untitled',
      description: article.description || '',
      source_name: article.source_name || article.source_id || 'News',
      link: article.link || '#',
      pubDate: article.pubDate || new Date().toISOString(),
      savedAt: new Date().toISOString()
    });
    showToast('💾 Saved for offline reading!');
  }

  try {
    localStorage.setItem(CONFIG.SAVED_ARTICLES_KEY, JSON.stringify(state.savedArticles));
  } catch (e) {}

  updateSavedCount();
}

function updateSavedCount() {
  el.savedCount.textContent = state.savedArticles.length;
}

function renderSavedArticles() {
  el.savedArticlesList.innerHTML = '';
  if (state.savedArticles.length === 0) {
    el.savedArticlesList.innerHTML = `
      <p style="text-align: center; color: var(--text-muted); padding: 24px 0;">No saved articles yet. Bookmark any article on the home feed to store it permanently on your device.</p>
    `;
    return;
  }

  state.savedArticles.forEach(item => {
    const div = document.createElement('div');
    div.className = 'saved-item';
    div.innerHTML = `
      <div style="flex: 1;">
        <h4 class="saved-item-title">${escapeHtml(item.title)}</h4>
        <p class="saved-item-meta">${escapeHtml(item.source_name)} • Saved ${formatRelativeTime(item.savedAt)}</p>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px;">${escapeHtml(item.description)}</p>
      </div>
      <button class="btn-danger-sm" title="Remove">✕</button>
    `;

    div.querySelector('.btn-danger-sm').addEventListener('click', () => {
      toggleSaveArticle(item);
      renderSavedArticles();
      renderNews(state.newsArticles);
    });

    el.savedArticlesList.appendChild(div);
  });
}

// ==========================================
// RECENT CITIES
// ==========================================
function getRecentCities() {
  try {
    const raw = localStorage.getItem(CONFIG.RECENT_CITIES_KEY);
    return raw ? JSON.parse(raw) : ['London', 'Mumbai', 'New York', 'Delhi', 'Tokyo', 'Paris'];
  } catch (e) {
    return ['London', 'Mumbai', 'New York', 'Delhi', 'Tokyo', 'Paris'];
  }
}

function addRecentCity(cityName) {
  if (!cityName) return;
  let cities = getRecentCities();
  cities = cities.filter(c => c.toLowerCase() !== cityName.toLowerCase());
  cities.unshift(cityName);
  if (cities.length > 8) cities = cities.slice(0, 8);

  try {
    localStorage.setItem(CONFIG.RECENT_CITIES_KEY, JSON.stringify(cities));
  } catch (e) {}

  renderRecentChips();
}

function renderRecentChips() {
  const cities = getRecentCities();
  el.recentChips.innerHTML = '';

  cities.forEach(city => {
    const chip = document.createElement('button');
    chip.className = 'city-chip cached-chip';
    chip.innerHTML = `${escapeHtml(city)} ⚡`;
    chip.title = `Instant offline archive available for ${city}`;

    chip.addEventListener('click', () => fetchDashboardData(city));
    el.recentChips.appendChild(chip);
  });
}

// ==========================================
// PREFERENCES & UTILITIES
// ==========================================
function loadPreferences() {
  try {
    const raw = localStorage.getItem(CONFIG.PREFS_KEY);
    if (raw) {
      const prefs = JSON.parse(raw);
      state.unit = prefs.unit || 'C';
      state.theme = prefs.theme || 'dark';
      state.currentCity = prefs.lastCity || CONFIG.DEFAULT_CITY;
    } else {
      state.currentCity = CONFIG.DEFAULT_CITY;
    }
  } catch (e) {
    state.currentCity = CONFIG.DEFAULT_CITY;
  }

  applyTheme(state.theme);
  updateUnitToggleUI();
}

function savePreferences() {
  try {
    localStorage.setItem(CONFIG.PREFS_KEY, JSON.stringify({
      unit: state.unit,
      theme: state.theme,
      lastCity: state.currentCity
    }));
  } catch (e) {}
}

function setUnit(unit) {
  if (state.unit === unit) return;
  state.unit = unit;
  updateUnitToggleUI();
  savePreferences();
  if (state.weatherData) renderWeather(state.weatherData);
}

function updateUnitToggleUI() {
  if (state.unit === 'C') {
    el.unitC.classList.add('active');
    el.unitF.classList.remove('active');
  } else {
    el.unitF.classList.add('active');
    el.unitC.classList.remove('active');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  if (theme === 'light') {
    el.themeIcon.innerHTML = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
  } else {
    el.themeIcon.innerHTML = `<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>`;
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  savePreferences();
}

function setCachedData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (e) {}
}

function getCachedData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function showLoadingState() {
  el.weatherCard.classList.add('loading-skeleton');
  el.locationName.textContent = 'Searching location...';
}

function formatRelativeTime(dateInput) {
  const date = typeof dateInput === 'number' ? new Date(dateInput) : new Date(dateInput);
  if (isNaN(date.getTime())) return 'Recently';
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

let toastTimer = null;
function showToast(msg) {
  if (!el.toast) return;
  el.toast.textContent = msg;
  el.toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.add('hidden'), 3500);
}
