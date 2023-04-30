/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FIREBASE_API_KEY: "AIzaSyAi4p8C5JZTM7vWYazw-3CwCNaOBGr9TG0",
    FIREBASE_AUTH_DOMAIN: "music-app-30d41.firebaseapp.com",
    FIREBASE_PROJECT_ID: "music-app-30d41",
    FIREBASE_STORAGE_BUCKET: "music-app-30d41.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "167267173426",
    FIREBASE_APP_ID: "1:167267173426:web:aa38aa855b1d1b13a7e82b",
    FIREBASE_MEASUREMENT_ID: "G-M9YKR6DRH0",
    API_BASE_URL: "http://localhost:9000/",
  }
}

module.exports = nextConfig
